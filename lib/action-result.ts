export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; errorCode?: string };

export function actionError<T = void>(message: string, errorCode?: string): ActionResult<T> {
  return { success: false, error: message, errorCode };
}

export function actionSuccess<T>(data?: T): ActionResult<T> {
  return { success: true, data };
}
