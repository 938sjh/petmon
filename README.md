<h1>PetMon</h1>
<h2>MERN Stack E-Commerce</h2>
[Front-end]

- 사용 스택: React, Redux toolkit, RTK Query, Styled Component
- IDE: VS Code

[Back-end]

- 사용 스택: NodeJs, Express, MongoDB, JWT, firebase-storage
- IDE: VS Code

[API 설계]

- RESTful API를 기반으로 설계
- 예외로 로그인 로그아웃은 /login, /logout으로 작성
- 보안상의 문제로 login, logout은 post를 사용해야함

<h3>주요 기능</h3>

- JWT Token 인증 방식을 통한 로그인, 회원가입
- Private Route를 통한 권한 확인
- RTK Query를 이용한 상품 페이지, 상세 페이지 조회
- RTK Query를 이용한 장바구니 추가, 삭제
- 상품 업로드 기능(사진은 firebase-storage, 그 외 정보는 MongoDB로 관리)
- 정규식을 이용한 검색 기능 구현
- 주문 내역 구현

<h3>구현 예정 기능</h3>

- i'mport를 이용한 결제 기능
- Docker를 이용한 배포 및 jenkins, docker hub 를 통한 CI/CD pipe 구축
<h3>화면 설명</h3>

- 로그인 페이지

<img width="527" alt="loginPage" src="https://github.com/938sjh/petmon/assets/63846952/8d244be8-cea9-4da2-bcef-2c340223ac9d">

- 회원가입 페이지

<img width="527" alt="signupPage" src="https://github.com/938sjh/petmon/assets/63846952/39ba9ab8-b059-401f-9f7d-83a3484d7f24">

- 랜딩 페이지

<img width="1792" alt="landingPage" src="https://github.com/938sjh/petmon/assets/63846952/95dc528a-2686-414d-9bad-018321567309">

- 업로드 페이지

<img width="734" alt="uploadPage" src="https://github.com/938sjh/petmon/assets/63846952/efa96800-e7d2-4dfc-8a35-6b2ec36b8c19">

- 전체 상품 페이지

<img width="1284" alt="allProductPage" src="https://github.com/938sjh/petmon/assets/63846952/a333ba7c-254a-4478-9510-a7c7aea0abf1">

- 상품 상세 페이지

<img width="1196" alt="detailPage" src="https://github.com/938sjh/petmon/assets/63846952/2d01a6a3-4677-4747-9bda-210b3f0bf360">

- 장바구니 페이지

<img width="1196" alt="cartPage" src="https://github.com/938sjh/petmon/assets/63846952/f479eee1-8275-42fa-92c2-36978752468e">

<h3>프로젝트 후기</h3>

- 이미지를 업로드할 때 클라이언트에서 업로드하는 것이 서버 부하도 줄고 더 효율적이지만 보안 문제로 인해 서버에서 firebase storage bucket에 저장하도록 구현

- RTK query는 데이터 캐싱에 최적화 돼있기 때문에 이를 이용해 상품페이지를 첫 방문 이후 방문할 때마다 서버로부터 새롭게 상품을 받아오는 것이 아닌 변경점이 생겼을 때만 비동기 처리를 하도록 효율적으로 구현 장바구니 역시 같은 방식으로 장바구니에 상품이 더해지거나 없어졌을 때만 refetch 하도록 구현

- 검색창을 useState로만 구현시 useState가 비동기 처리임에서 오는 딜레이가 있었다. 이를 useTransition훅으로 감싸 빠르게 구현, 또한 기존의 text index로 상품을 검색하는 것 보다 정규표현식으로 검색하는 것이 더 빠르기에 이를 이용하여 구현

* 상품 출처 가또페로
