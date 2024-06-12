function ErrorField({ message }) {
  return (
    <p className="mt-2 font-normal text-sm md:text-base text-red-600 mr-2">
      {message}
    </p>
  );
}

export default ErrorField;
