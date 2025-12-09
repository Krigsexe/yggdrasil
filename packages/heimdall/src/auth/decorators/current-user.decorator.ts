/**
 * Current User Decorator
 *
 * Extracts the authenticated user from the request.
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@yggdrasil/shared';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    return request.user;
  }
);
