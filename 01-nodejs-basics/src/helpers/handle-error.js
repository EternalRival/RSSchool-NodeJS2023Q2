export function handleError(error, objectiveError) {
  if (error.code === objectiveError?.code) Object.assign(error, objectiveError);
  throw error;
}
