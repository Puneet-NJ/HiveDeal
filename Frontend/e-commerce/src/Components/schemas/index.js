import * as Yup from "yup";

const getCharacterValidationError = (str) => {
	return `Your password must have at least 1 ${str} character`;
};

export const loginSchema = (isSignInForm) => {
	return (
		Yup.object({
			customerName: Yup.string().when("isSignInForm", {
				is: false,
				then: Yup.string().min(2).required("Name is required"),
				otherwise: Yup.string().notRequired(),
			}),
			customerEmail: Yup.string().email().required(),
			customerPassword: Yup.string()
				.required("Please enter a password")
				// check minimum characters
				.min(8, "Password must have at least 8 characters")
				// different error messages for different requirements
				.matches(/[0-9]/, getCharacterValidationError("digit"))
				.matches(/[a-z]/, getCharacterValidationError("lowercase"))
				.matches(/[A-Z]/, getCharacterValidationError("uppercase")),
		})
			// Add a constant to represent the condition
			.concat(
				Yup.object({
					isSignInForm: Yup.boolean().default(isSignInForm),
				})
			)
	);
};
