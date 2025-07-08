export { default } from "site/components/blog/PostsFromWordPress.tsx";

export function LoadingFallback() {
  return (
    <div style={{ height: "150px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
