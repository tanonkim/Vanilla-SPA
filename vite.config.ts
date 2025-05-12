import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * @fileoverview Vite 설정
 * @description
 * - jsx: "transform"      : jsx요소마다 `jsxFactory`에 정의된 함수를 호출하는 방식으로 변환
 * - jsxInject: `import ~` : esbuild로 변환된 모든 파일에 대해 import 구문을 자동으로 삽입
 * - jsxFactory: "h",      : 사용할 JSX팩토리 함수 h(type, props, ...children) 형태의 함수를 지정
 */
export default defineConfig({
  plugins: [tsconfigPaths()],
  esbuild: {
    jsx: "transform",
    jsxInject: `import { h } from '@/shared/lib/jsx/jsx-runtime'`,
    jsxFactory: "h",
  },
});
