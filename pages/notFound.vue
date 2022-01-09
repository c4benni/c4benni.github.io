<template>
  <div class="root fade-appear">
    <div class="main">
      <h2 class="title gradient-text">Not found</h2>
      <h3 class="subtitle">
        The URL you entered is incorrect.<br />Check the URL and try again.
      </h3>

      <UiImg
        src="https://etllflmdfvutclujgeah.supabase.in/storage/v1/object/public/media/404.png"
        height="320px"
        width="100%"
        alt="under construction illustration"
      />

      <UiBtn class="primary back-home" to="/">
        <UiIcon icon="chevronLeft" size="36px"></UiIcon>
        Home page
      </UiBtn>
    </div>
  </div>
</template>

<script>
import { UiIcon } from "../src/components/utils/icons";

export default {
  components: { UiIcon },
  name: "NotFoundPAge",
  meta: {
    title: "404 page",
  },
};
</script>

<style scoped>
.root {
  --title-font-size: 56px;
  --appear-duration: 200ms;
  display: grid;
  max-width: var(--max-width);
  margin: 0 auto;
}

.sm-down .root {
  --title-font-size: 32px;
}

.main {
  min-height: calc(100vh - var(--header-height));
  display: grid;
  align-content: flex-start;
}

.title {
  font-size: var(--title-font-size);
  font-weight: 800;
  text-align: left;
  background-image: linear-gradient(
    to right,
    var(--theme-surface-invert),
    var(--secondary)
  );
  line-height: 1.3;
  padding: var(--qtr-x-gutter) var(--x-gutter) 0;
}

.subtitle {
  font-size: 1rem;
  font-weight: 400;
  text-align: left;
  line-height: 1.5;
  color: var(--subtitle-c);
  padding: var(--qtr-x-gutter) var(--x-gutter) 0;
}

.back-home {
  width: min(60%, 300px);
  margin: var(--x-gutter) auto var(--x-gutter);
  column-gap: 0.15rem;
}

.app-footer {
  position: relative;
  padding: var(--x-gutter);
  padding-bottom: calc(var(--x-gutter) + 32px);
  grid-auto-flow: row;
  row-gap: var(--x-gutter);
  justify-items: center;
  height: fit-content !important;
  background: var(--theme-banner);
}

.app-footer::before {
  border-top: 0.5px solid;
  opacity: 0.15;
}

.icons-8 {
  padding: 0 var(--x-gutter);
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  color: var(--caption-c);
}

.icons-8 a {
  color: var(--secondary-bg);
}
</style>
