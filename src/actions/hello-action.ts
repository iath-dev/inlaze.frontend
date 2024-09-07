"use server";
export const helloAction = async (
  name: string,
): Promise<{
  message: string;
}> => {
  return Promise.resolve({ message: `Hello ${name}, from server!` });
};
