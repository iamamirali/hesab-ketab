import { type LoginFormValues } from "../schemas/login.schema";
import { type SignupFormValues } from "../schemas/signup.schema";

export type ActionState<TFieldValues> = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof TFieldValues, string[]>>;
};

export type LoginActionState = ActionState<LoginFormValues>;

export type SignupActionState = ActionState<SignupFormValues>;
