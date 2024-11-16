export class customError extends Error {
  constructor(reason, data, statusCode = 500, errorCode = "UNKNOWN") {
    super(reason);
    this.reason = reason;
    this.data = data;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

//user
export class DuplicateUserPhoneError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U001");
  }
}

export class undefinedUserError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U011");
  }
}

export class NotFoundUserError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U021");
  }
}


//store
export class DuplicateStoreError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U002");
  }
}

export class undefinedStoreError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U012");
  }
}

export class NotFoundStoreError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U022");
  }
}



//review
export class DuplicateReviewError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U003");
  }
}

export class undefinedReviewError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U013");
  }
}



//mission
export class DuplicateMissionError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U004");
  }
}

export class undefinedMissionError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U014");
  }
}

export class NotFoundMissionError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U024");
  }
}

//missionList
export class undefinedMissionListError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U015");
  }
}

export class NotFoundMissionListError extends customError {
  constructor(reason, data, statusCode = 500) {
    super(reason, data, statusCode, "U025");
  }
}

