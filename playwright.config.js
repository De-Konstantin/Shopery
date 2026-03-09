import { defineConfig, devices } from '@playwright/test';

/**
 * =============================================
 * PLAYWRIGHT CONFIGURATION
 * =============================================
 * Конфіг для smoke-тестів фронтенда
 * 
 * Спеціальна конфігурація для тестування React приложений
 * з lungo timeout для API запросов и desarrollo сервера
 */

export default defineConfig({
  // Папка с тестами
  testDir: './tests',

  // Пошук тестовых файлов по этом патерну
  testMatch: '**/*.e2e.js',

  // Максимальное время на один тест (в мс)
  timeout: 30 * 1000, // 30 секунд - достаточно для медленного интеренета

  // Максимальное время на весь test.describe блок
  testTimeout: 30 * 1000,

  // Expect timeout
  expect: {
    timeout: 10 * 1000, // 10 секунд на проверку условія
  },

  // Запускать тесты паралельно?
  fullyParallel: false, // Последовательно - безопаснее для shared state

  // Количество попыток если тест упал
  retries: 1,

  // Количество воркеров (браузеров одновременно)
  workers: 1,

  // Выводить результаты в терминал
  reporter: [
    ['html', { outputFolder: 'test-results' }],
    ['list'],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],

  // Конфіг для запуска браузеров
  use: {
    // URL базовый
    baseURL: 'http://localhost:5173',

    // Сохранять скриншоты при падении тестов
    screenshot: 'only-on-failure',
    screenshotDir: 'test-results/screenshots',

    // Записывать視頻
    video: 'retain-on-failure',
    videoDir: 'test-results/videos',

    // Трейс файли для дебага
    trace: 'on-first-retry',
  },

  // Проверка доступности перед тестом
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true, // Использовать существующий сервер если уже запущен
    timeout: 120 * 1000, // 2 минуты на запуск сервера
  },

  // Браузеры для тестирования
  projects: [
    // Тестируем на Chrome (основной браузер для e-commerce)
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Firefox для cross-browser совместимості
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // Safari для макос
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Мобилы
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Хук перед запуском всех тестов
  globalSetup: undefined,

  // Хук после запуска всех тестов
  globalTeardown: undefined,
});
