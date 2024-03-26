function PasswordMismatch({setError}: any) {
    return (
        <div className={"error"} onClick={() => setError(false)}>
            <h1>Passwords do not match</h1>
        </div>
    );
}

export default PasswordMismatch;