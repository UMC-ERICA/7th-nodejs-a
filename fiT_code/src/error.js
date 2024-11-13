export class Errordata extends Error {
    constructor(reason, errorCode, data) {
      super(reason);
      this.reason = reason;
      this.errorCode = errorCode;
      this.data = data;
    }
  };
  
  export class ReviewNotFoundError extends Errordata {
    constructor(reason, data) {
      super(reason, "R001", data);
    }
  };

  export class NotCreateReview extends Errordata {
    constructor(reason, data) {
      super(reason, "R002", data);
    }
  }

  export class NotFoundAccount extends Errordata {
    constructor(reason, data) {
      super(reason, "A001", data);
    }
  }

  export class NotFoundMission extends Errordata {
    constructor(reason, data) {
      super(reason, "M001", data);
    }
  }

  export class NotFoundRestaurant extends Errordata {
    constructor(reason, data) {
      super(reason, "RT01", data);
    }
  }

  export class NotFoundMissionOfRestaurant extends Errordata {
    constructor(reason, data) {
      super(reason, "RT11", data);
    }
  }

  export class alreadyOngoingMission extends Errordata {
    constructor(reason, data) {
      super(reason, "M010", data);
    }
  }

  export class NotOngoingMission extends Errordata {
    constructor(reason, data) {
      super(reason, "M011", data);
    }
  }

  export class alreayExistRestaurant extends Errordata {
    constructor(reason, data) {
      super(reason, "RT03", data);
    }
  }