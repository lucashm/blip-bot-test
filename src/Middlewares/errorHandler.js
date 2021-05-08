const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (!err.response) { // not sure from where it came from
    res.sendStatus(500);
    return;
  }
  const { status, data } = err.response;
  res.status(status || 500).json({ status: 'error', message: data.message });
  next();
};

// could be enhanced to use a generic Class Error and others that inherints from it
const errorBuilder = (message, status) => ({ response: { data: { message }, status } });

export { errorHandler, errorBuilder };
