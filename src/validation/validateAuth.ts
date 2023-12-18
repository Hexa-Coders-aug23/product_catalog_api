export function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }
}

export const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 8) {
    return 'Password should contain at least 8 characters';
  }
};
