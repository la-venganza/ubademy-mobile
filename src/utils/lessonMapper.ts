const map = (input) => {
  const output = { ...input };
  output.multimediaUri = input.multimedia_id;
  return output;
};

export default map;
