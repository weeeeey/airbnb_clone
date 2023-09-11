# skywnw for booking

## Video

[![Video Label](http://img.youtube.com/vi/v178qSOL8zM/0.jpg)](https://youtu.be/v178qSOL8zM)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
## Set .env
```
DATABASE_URL=

NEXTAUTH_SECRET =
GITHUB_ID =
GITHUB_SECRET =

GOOGLE_ID = 
GOOGLE_SECRET =

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 
NEXT_PUBLIC_CLOUDINARY_CLOUD_API_KEY =
NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET = 
```

## Key Features
- **카테고리 분류**: 여행 숙소를 여러 카테고리로 나누어 사용자에게 편리한 검색 및 브라우징 기능 제공.

- **지도 표시**: React-Leaflet을 사용하여 전세계 지도에 여행 숙소의 위치를 표시하고 상세 정보 제공.

- **예약 관리**: 예약한 숙소는 해당 날짜에 다른 사용자의 예약을 막아두어 중복 예약을 방지.

- **이미지 관리**: Cloudinary를 통해 숙소 이미지를 업로드, 저장, 및 관리하여 고성능 이미지 제공.

- **사용자 인증**: Next-Auth를 사용하여 사용자 등록, 로그인, 로그아웃 기능을 제공하고 보안을 강화.

- **검색 및 필터링**: 여행 숙소를 검색하고 필터링하여 사용자에게 맞는 숙소를 찾을 수 있는 기능 제공.

- **평가 및 리뷰**: 숙소에 대한 평가와 리뷰를 작성하고 읽을 수 있어 사용자 간 경험 공유 가능.

- **탐색 및 발견**: 추천된 여행지나 인기있는 숙소를 표시하여 사용자에게 다양한 선택을 제공.

- **반응형 디자인**: 다양한 기기와 화면 크기에서 웹 사이트가 잘 작동하도록 반응형 디자인 적용.

## Technologies Used

- **React**: UI 개발을 위한 주요 라이브러리.
- **Next.js**: React 앱을 서버 사이드 렌더링 및 라우팅을 위한 프레임워크.
- **Tailwind CSS**: 빠르고 유연한 CSS 프레임워크로 스타일링.
- **React-Leaflet**: 지도 표시를 위한 리액트 컴포넌트 라이브러리.
- **Cloudinary**: 숙소 이미지 저장 및 관리를 위한 클라우드 서비스.
- **Prisma**: 데이터베이스 ORM(Object-Relational Mapping) 라이브러리로 데이터베이스 조작 및 관리.
- **Next-Auth**: 인증 및 사용자 관리를 위한 라이브러리.
- **Bcrypt**: 암호화 및 보안을 위한 라이브러리.
- **Axios**: HTTP 요청 처리를 위한 라이브러리.
- **TypeScript**: 정적 타입 체크 및 개발 생산성 향상을 위한 언어.
- **Eslint 및 Prettier**: 코드 스타일 검사 및 포맷팅.
- **React-Select**: 커스텀 셀렉트 박스 구현을 위한 라이브러리.
- **React-Hook-Form**: 폼 관리를 위한 라이브러리.
- **World-Countries**: 국가 데이터를 관리하기 위한 라이브러리.
- **Zustand**: 상태 관리를 위한 라이브러리.



-   **Next.js**: 서버 렌더링 애플리케이션을 구축하기 위한 React 프레임워크.
-   **Prisma**: Node.js용 데이터베이스 툴킷 및 ORM(Object-Relational Mapping).
-   **Clerk**: 인증 및 사용자 관리를 위한 라이브러리.
-   **Zustand**: 상태 관리 라이브러리.
-   **Socket.io**: 실시간 통신을 위한 라이브러리.
-   **Livekit**: 비디오 및 오디오 통신을 위한 라이브러리.
-   **Tailwind CSS**: 스타일링을 위한 유틸리티 중심의 CSS 프레임워크.
-   **TypeScript**: 정적 타입 지원을 갖춘 JavaScript의 확장 버전.
-   **shadcn/ui**: Radix UI와 Tailwind CSS를 사용하여 만든 재사용 가능한 컴포넌트.

## Deployment

Our project is deployed on Railway, and you can access it at https://wiscord.up.railway.app/.
