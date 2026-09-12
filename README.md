# English-Quest
 (cd "$(git rev-parse --show-toplevel)" && printf '%s' 'diff --git a/README.md b/README.md
index c1e49e4e95194fb73150d5f8593dada4ad5ccb67..0af13b74a06c66ddc6c27519295bdd9de585f39f 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,21 @@
-# English-Quest
\ No newline at end of file
+# English Quest
+
+Небольшая браузерная игра для повторения первых двух глав **Spotlight 3**.
+
+## Что тренирует
+
+- лексику по темам школьных предметов и семьи;
+- чтение и понимание коротких фраз;
+- вопросы `What'\''s this?` и `Have you got ...?`;
+- построение утверждений из слов;
+- произношение через кнопки прослушивания и повторения.
+
+Откройте `index.html` в современном браузере. Прогресс (XP, кристаллы и пройденные главы) хранится только в `localStorage` браузера.
+
+## Публикация на GitHub Pages
+
+После загрузки репозитория на GitHub откройте **Settings → Pages**, в разделе
+**Build and deployment** выберите источник **GitHub Actions**. При каждом пуше в
+ветку `main` workflow `.github/workflows/deploy-pages.yml` опубликует игру.
+Ссылка появится в итогах запуска workflow и обычно имеет вид
+`https://<ваш-логин>.github.io/<имя-репозитория>/`.
' | git apply --3way)
