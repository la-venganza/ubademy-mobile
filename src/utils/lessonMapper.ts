const map = (input) => {
  const output = { ...input };
  output.multimediaUri = input.multimedia_id;
  output.position = input.sequence_number;
  return output;
};

export default map;
