import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { getBase64FromDataURL, getMediaTypeFromDataURL } from "@/lib/utils"
import { ChatSettings } from "@/types"
import { createAnthropic } from "@ai-sdk/anthropic"
import { streamText } from "ai"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.anthropic_api_key, "Anthropic")

    // Convert messages to AI SDK format
    const formattedMessages = messages.map((message: any) => {
      const messageContent =
        typeof message?.content === "string"
          ? message.content
          : message?.content?.map((content: any) => {
              if (typeof content === "string") {
                return { type: "text" as const, text: content }
              } else if (
                content?.type === "image_url" &&
                content?.image_url?.url?.length
              ) {
                return {
                  type: "image" as const,
                  image: content.image_url.url
                }
              } else if (content?.type === "text") {
                return { type: "text" as const, text: content.text }
              }
              return content
            })

      return {
        role: message.role,
        content: messageContent
      }
    })

    const anthropic = createAnthropic({
      apiKey: profile.anthropic_api_key || ""
    })

    try {
      const result = streamText({
        model: anthropic(chatSettings.model),
        messages: formattedMessages,
        temperature: chatSettings.temperature,
        maxTokens:
          CHAT_SETTING_LIMITS[chatSettings.model]?.MAX_TOKEN_OUTPUT_LENGTH
      })

      return result.toDataStreamResponse()
    } catch (error: any) {
      console.error("Error calling Anthropic API:", error)
      return new NextResponse(
        JSON.stringify({
          message: "An error occurred while calling the Anthropic API"
        }),
        { status: 500 }
      )
    }
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Anthropic API Key not found. Please set it in your profile settings."
    } else if (errorCode === 401) {
      errorMessage =
        "Anthropic API Key is incorrect. Please fix it in your profile settings."
    }

    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
