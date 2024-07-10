# Structure

## main-provider.tsx
プロジェクト全体のSuspenseやErrorBoundaryを管理する


## root.tsx
共通レイアウト以下のSuspenseやErrorBoundaryを管理する

## Suspenseのネスト
基本的に内側のSuspenseで処理される。
ErrorBoundaryについても同様。


## Suspense + React Query
useSuspenseQuery()メソッドを使用することで、
Suspenseに対応できる。
また、Routerのloader内でやってもSuspenseに対応しない。
画面描画関連を行う前にloaderが動くので、コンポーネントロジックに起因しない。