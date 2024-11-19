export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class undefinedStoreError extends Error {
  errorCode = "U002";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class undefinedUserError extends Error {
  errorCode = "U003";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class undefinedMissionError extends Error {
  errorCode = "U004";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class alreadyMissionError extends Error {
  errorCode = "U004";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}