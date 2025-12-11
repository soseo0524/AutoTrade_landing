# AutoTrade Backend

Spring Boot 기반 백엔드 애플리케이션입니다.

## 기술 스택

- Spring Boot 3.2.0
- Java 17
- Gradle
- PostgreSQL 16+ with pgvector extension
- QueryDSL 5.0.0
- JPA/Hibernate

## 프로젝트 구조

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/autotrade/
│   │   │   ├── common/
│   │   │   │   └── BaseEntity.java          # Audit 필드 (createdAt, updatedAt)
│   │   │   ├── config/
│   │   │   │   └── JpaAuditingConfig.java   # JPA Auditing 활성화
│   │   │   ├── entity/
│   │   │   │   ├── enums/                   # Enum 클래스들
│   │   │   │   ├── partner/                 # Partner 모듈 (XOR 패턴)
│   │   │   │   ├── asset/                   # Asset 모듈 (pgvector)
│   │   │   │   ├── logistics/               # Logistics 모듈
│   │   │   │   ├── transaction/             # Transaction 모듈
│   │   │   │   └── system/                  # System 모듈 (파티셔닝)
│   │   │   └── AutoTradeApplication.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── db/migration/               # Flyway 마이그레이션 스크립트
│   └── test/
└── build.gradle
```

## 주요 엔티티

### Partner Module (XOR 패턴)
- **Shop**: 사업자 등록번호, 이름, 코드
- **Individual**: 이메일, 개인 전화번호
- **Ambassador**: 코드, 커미션율
- **Contract**: 계약서 (Shop/Individual/Ambassador 중 하나만 연결)
- **Address**: 주소 마스터 테이블
- **PartnerAddress**: Partner와 Address 연결 (타입 포함)

### Asset Module (AI & Vector)
- **Part**: 부품 (pgvector 1536차원 임베딩 포함)
- **MediaAsset**: 이미지/비디오 (Part와 1:N, CASCADE 삭제)

### Logistics Module
- **Warehouse**: 창고 정보 (RESTRICT 삭제)
- **WarehouseTransfer**: 창고 간 이동 이력

### Transaction Module
- **Sale**: 판매 거래 (Part와 1:1, Unique)
- **Delivery**: 배송 정보 (Sale과 1:1)

### System Module (파티셔닝)
- **SystemErrorLog**: 에러 로그 (월별 Range 파티셔닝, 복합 PK)

## 데이터베이스 설정

### PostgreSQL 설정

`application.yml` 파일에서 PostgreSQL 연결 정보를 확인하세요.

기본 설정:
- URL: `jdbc:postgresql://localhost:5432/autotrade`
- Username: `postgres`
- Password: `postgres`

### 데이터베이스 생성 및 확장 설치

PostgreSQL에서 다음 명령어를 실행하세요:

```sql
-- 데이터베이스 생성
CREATE DATABASE autotrade;

-- pgvector 확장 설치 (애플리케이션 시작 시 자동 실행됨)
CREATE EXTENSION IF NOT EXISTS vector;
```

### 주요 데이터베이스 기능

1. **pgvector**: AI 기반 자연어 검색을 위한 벡터 임베딩 저장
2. **파티셔닝**: SystemErrorLog 테이블 월별 Range 파티셔닝
3. **HNSW 인덱스**: 고차원 벡터 검색 최적화

## 빌드 및 실행

### Gradle Wrapper 생성 (최초 1회)

```bash
cd backend
gradle wrapper
```

### 프로젝트 빌드

```bash
./gradlew build
```

### 애플리케이션 실행

```bash
./gradlew bootRun
```

또는

```bash
gradle bootRun
```

## 포트 및 컨텍스트 경로

- 기본 포트: `8080`
- 컨텍스트 경로: `/api`

## 데이터베이스 마이그레이션

Flyway를 사용하여 데이터베이스 마이그레이션을 관리합니다.

마이그레이션 스크립트는 `src/main/resources/db/migration/` 디렉토리에 있습니다:

- `V0__enable_pgvector_extension.sql`: pgvector 확장 활성화
- `V1__create_partitioned_error_log.sql`: SystemErrorLog 파티션 테이블 생성
- `V2__create_vector_index.sql`: Part.description_vector HNSW 인덱스 생성
- `V3__add_warehouse_restrict_constraint.sql`: Warehouse 제약 조건

## 주요 제약 조건

1. **XOR 패턴**: Contract, PartnerAddress는 Shop/Individual/Ambassador 중 하나만 연결
2. **Unique 제약**: Sale.partId는 Unique (Part와 1:1)
3. **CASCADE 삭제**: MediaAsset은 Part 삭제 시 함께 삭제
4. **RESTRICT 삭제**: Warehouse는 Part가 연결되어 있으면 삭제 불가

## QueryDSL 설정

QueryDSL QClass는 빌드 시 자동 생성됩니다.

생성 위치: `build/generated/querydsl/`

## 개발 가이드

### 엔티티 네이밍 규칙

- 데이터베이스 테이블: `snake_case` (예: `system_error_log`)
- Java 엔티티: `camelCase` (예: `SystemErrorLog`)
- Primary Key: `BIGSERIAL` (Long 타입)

### BaseEntity 상속

모든 엔티티는 `BaseEntity`를 상속받아 `createdAt`, `updatedAt` 필드를 자동으로 관리합니다.

단, `SystemErrorLog`는 복합 PK로 인해 `BaseEntity`를 상속받지 않습니다.

## 참고사항

- pgvector 확장은 PostgreSQL 16+ 버전에서 지원됩니다.
- HNSW 인덱스는 대용량 벡터 데이터에 최적화되어 있습니다.
- 파티셔닝은 성능 향상과 데이터 관리 효율성을 위해 사용됩니다.
