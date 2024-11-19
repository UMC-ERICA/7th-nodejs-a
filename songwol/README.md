# UMC 7th ERICA Server(Node.js)

UMC 7th ERICA Server(Node.js) 파트 Team-A 레포지토리 입니다.

---

### 사용 방법

1. `git clone https://github.com/UMC-ERICA/7th-nodejs-a.git` 명령어로 본인의 저장소와 연동시킵니다.
2. `git checkout [닉네임(브랜치명)]` 명령어로 본인의 브랜치로 이동합니다.
3. 본인 닉네임으로 된 폴더 안에 주차별로 weekn 폴더를 만든 후 안에서 작업합니다. ex) week1, week2...
4. 작업이 끝났으면...
5. 커밋 및 푸시
   ```
   git add .
   git commit -m "커밋 메세지"
   git push
   ```
6. main 브랜치로 Pull Request 작성하기

### 1️⃣ 본인 닉네임에 해당하는 브랜치를 만드시고 진행하시면 됩니다. 해당 브랜치에서 워크북 미션을 진행 합니다.

본인에 해당하는 브랜치로 Checkout 하여 **각자 닉네임에 해당하는 디렉토리를 만들어** 미션을 진행 하시면 됩니다.

다른 스터디원의 브랜치는 참고만 할 뿐, 건드리시면 안됩니다!

### 2️⃣ 스터디를 진행하면서 작성한 코드를 Commit 합니다.

**❗️Commit 컨벤션은 다음과 같습니다.❗️**

```
CHORE: 코드 수정, 내부 파일 수정
FEAT: 새로운 기능 추가
FIX: 버그, 오류 수정
REFACTOR: 전면 수정(코드 리펙토링)

아래는 예시 입니다.

[FEAT] 회원 조회 API 구현
[CHORE] USER 테이블 컬럼 명 수정
[FIX] createAt, updateAt 적용 안되던 오류 수정
```

### 3️⃣ 해당 주차 워크북 학습을 다 완료 하셨으면 Push 해주시고, main 브랜치로 Pull Request를 작성 해주시면 됩니다.

❗️Pull Request 컨벤션은 다음과 같습니다.❗️

PR 타이틀과 내용은 다음과 같이 설정해주시면 됩니다.

```
#주차_미션_닉네임
----------------
## Summary
- 요약

## Describe your changes
- 내용

## Checklist
- [ ] 리뷰어 등록

```

**Reviewers**에는 스터디원 전원(파트장 포함)을 설정 해주시면 되고, **Assignees** 에는 PR을 작성한 본인을 지정 하시면 됩니다.

PR은 ❗️파트장 포함 최소 2명의 Approve를 받아야❗️ Merge 할 수 있도록 설정 했습니다!
따라서 **파트장과 팀원 한 명의 Approve를 받으면 PR을 작성한 본인이 main 브랜치로 머지를 진행 합니다.**

즉, 스터디 원 모두 Github을 수시로 확인 해주셔야 합니다!

또한, 단순히 Approve만 하는 것이 아니라 Comment도 반드시 작성 하셔야 합니다.