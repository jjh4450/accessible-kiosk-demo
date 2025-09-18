import { ComponentType } from "react";

/**
 * 비동기 컴포넌트 타입
 * @typedef {Promise<{ default: React.ComponentType<{}> }>} LazyComponent
 * @description React의 동적 로딩을 지원하는 컴포넌트 타입입니다. import()로 로드된 모듈에서
 *              기본 내보내기(`default export`)를 가져와 React 컴포넌트로 사용합니다.
 */
export type LazyComponent = Promise<{ default: ComponentType<unknown> }>;

/**
 * 라우팅 정보 객체 타입
 * @typedef {object} routerInfoTypeBase
 * @property {string} path - 라우팅 경로
 * @property {LazyComponent} element - 라우팅 컴포넌트
 * @property {string} [korean] - 한글 이름 (선택적)
 * @property {boolean} [expose] - 헤더 노출 여부 (선택적)
 */

export type routerInfoType =
  | {
      path: string;
      element: LazyComponent;
      expose: true;
      korean: string;
    }
  | {
      path: string;
      element: LazyComponent;
      expose?: false;
      korean?: string;
    };
