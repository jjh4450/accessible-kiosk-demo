import * as styles from "./index.css.ts";

const HomePage = () => {
  const highlightItems = [
    {
      title: "최적화된 빌드 환경",
      description:
        "이미지 최적화(WebP 변환, 메타데이터 제거), 에셋 압축(Gzip), 스마트 벤더 청크 분리 등",
    },
    {
      title: "경로 별칭",
      description: "@를 /src로 매핑해, 깔끔한 import 경로 제공",
    },
    {
      title: "플러그인 구성",
      description:
        "React SWC, Vanilla Extract, Imagetools, SVGR, Compression Plugin 등",
    },
    {
      title: "폴더 기반 구조",
      description:
        "assets, components, pages, shared, utils로 정리된 구조 제공",
    },
    {
      title: "폴더 기반 라우팅",
      description: "pages 디렉토리 기반 자동 라우팅으로 직관적인 라우팅 관리",
    },
    {
      title: "CI/CD 통합 (Husky)",
      description: "Git Hooks 활용, 사전 커밋 및 푸시 단계에서 자동화된 검증",
    },
  ];

  return (
    <main className={styles.pageContainer}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.mainTitle}>Sticky Front 첫 걸음</h1>
        <p className={styles.subtitle}>
          <a
            href="https://github.com/stickyChurros/stickyfront?tab=readme-ov-file#sticky-front"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            README
          </a>
          의 핵심 포인트들을 살짝 맛보기로 만나보세요!
        </p>
      </div>

      <section className={styles.cardsGrid}>
        {highlightItems.map((item, index) => (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
