# KB-SKELETON
### 
[SSook 서비스로 이동](https://kb-ssook.netlify.app/)

<img width="706" alt="image" src="https://github.com/user-attachments/assets/3c3b5d9e-b693-4c26-b8b8-9ac1531a5575" />



### Project R & R
<img width="710" alt="image" src="https://github.com/user-attachments/assets/c0fb0aa4-96f2-4871-9c67-bef810dcf540" />

### Tech Stack
<img width="608" alt="image" src="https://github.com/user-attachments/assets/5e701a72-437c-4cee-a039-b6eb4df45688" />

### Flow chart
<img width="766" alt="image" src="https://github.com/user-attachments/assets/5e34eb42-b015-418b-92c0-b365a1be99e8" />


### Commit Convention
| Tag Name   | Description |
|------------|-------------|
| Feat       | 새로운 기능을 추가 |
| Fix        | 버그 수정 |
| Design     | CSS 등 사용자 UI 디자인 변경 |
| Style      | 코드 포맷 변경, 주석, 세미 콜론 누락, 코드 수정이 없는 경우 |
| Refactor   | 프로덕션 코드 리팩토링 |
| Docs       | 문서 수정 |
| Test       | 테스트 코드, 리팩토링 테스트 코드 추가, Production Code(실제 사용하는 코드) 변경 없음 |
| Chore      | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
| Rename     | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 |

### Git Workflow
```plaintext
main (배포용)
└── develop (개발용)
├── feat/login
├── feat/signup
├── feat/transaction
├── feat/expense
├── feat/stats
├── feat/detail
└── feat/common
```
- 페이지별 브랜치 생성
    - 로그인 페이지(login) `크리스탈`
    - 회원가입 페이지(sign) `크리스탈`
    - 기록하기 페이지(transaction) `서연`
    - 메인 페이지(main) `서연`
    - 나의 가계부 페이지(expense) `예빈`
    - 통계 페이지(stats) `혜원`
    - 상세 페이지(detail) `혜원`
    - 공용 컴포넌트(common) `예빈`
- 본인 담당 브랜치에서 작업 후 develop 브랜치로 pr 날리기
- 서로 pr 확인 후 승인되면 merge

### Trouble Shooting
| 문제 상황 | 해결 방법 |
| -------- | -------- |
| db.json 파일이 Netlify 를 통해서는 배포되지 않는 문제 발생 | Render를 사용해 db.json을 포함한 백엔드 서버를 따로 배포하여 문제 해결 |
| 프론트엔드는 Netlify, 백엔드는 Render로 따로 배포한 상황에서 CORS 및 통신 연결 문제가 발생 | 1. 환경 변수로 서버 주소를 저장하여 관리<br>2. proxy 설정을 추가하여 Netlify에서 Render 백엔드 서버로 요청을 정상적으로 보내도록 수정 |
| 상태 관리를 수동으로 처리하는 번거로움 및 일관성 문제 | Pinia를 도입해 자동화된 상태 관리 시스템 구축 및 코드의 가독성과 유지보수성 향상 |
