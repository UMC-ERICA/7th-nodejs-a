export class DuplicateUserEmailError extends Error {
  errorCode = 'UOO1';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
export class errordata extends Error {
  constructor(reason, errorCode, data) {
    super(reason);
    this.reason = reason;
    this.errorCode = errorCode;
    this.data = data;
  }
}
//week7
//없는 유저 조회시
export class UserNotFoundError extends errordata {
  constructor(reason, data) {
    super(reason, 'P2025', data);
  }
}
//유저에게 리뷰가 없을경우
export class ReviewNotFoundError extends errordata {
  constructor(reason, data) {
    super(reason, '404', data);
  }
}
//상점이 없을경우
export class StoreNotFoundError extends errordata {
  constructor(reason, data) {
    super(reason, 'P2025', data);
  }
}
//상점에 미션이 없을경우
export class StoreMissionNotFoundError extends errordata {
  constructor(reason, data) {
    super(reason, '404', data);
  }
}
//내가 진행중인 미션이 없을때
export class MymissionNotFoundError extends errordata {
  constructor(reason, data) {
    super(reason, '404', data);
  }
}
