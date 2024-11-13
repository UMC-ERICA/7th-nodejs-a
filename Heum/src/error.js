export class customError extends Error {
  constructor(reason, data, errorCode = "U001") {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.errorCode = errorCode;
    if(errorCode !== "U001"){
      this.statusCode = parseInt(errorCode);
    }
  }
}
