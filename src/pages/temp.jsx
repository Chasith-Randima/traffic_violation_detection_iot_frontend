const [alert, setAlert] = useState({
  message: "",
  error: false,
  loading: false,
  success: false,
});

const resetAlert = () => {
  setAlert({ message: "", error: false, loading: false, success: false });
};

setAlert({ ...alert, loading: true });

if (data.status && data.status == "success") {
  setAlert({
    ...alert,
    loading: false,
    message: data.message,
    error: false,
    success: true,
  });

  window.setTimeout(() => {
    setAlert({ ...alert, success: false, message: "" });
  }, 1500);
}

//   ---in catch

setAlert({
  ...alert,
  loading: false,
  message: err.message,
  error: true,
  success: false,
});

<div className="flex justify-center">
  {alert.error && (
    <Message
      message={alert.message}
      // alert={"error"}
      resetAlert={resetAlert}
    />
  )}
  {alert.success && (
    <Message
      message={alert.message}
      // alert={"success"}
      resetAlert={resetAlert}
    />
  )}
  {alert.loading && (
    <Message
      message={"Loading...Please Waite..."}
      // alert={"loading"}
      resetAlert={resetAlert}
    />
  )}
</div>;
