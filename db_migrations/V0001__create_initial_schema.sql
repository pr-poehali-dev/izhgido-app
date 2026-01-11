-- Создание таблицы событий
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    location_address VARCHAR(500),
    price DECIMAL(10, 2) DEFAULT 0,
    image_url TEXT,
    tickets_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы транспортных маршрутов
CREATE TABLE IF NOT EXISTS transport_routes (
    id SERIAL PRIMARY KEY,
    route_number VARCHAR(10) NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    transport_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы позиций транспорта в реальном времени
CREATE TABLE IF NOT EXISTS transport_live (
    id SERIAL PRIMARY KEY,
    route_id INTEGER REFERENCES transport_routes(id),
    current_location VARCHAR(255),
    next_stop VARCHAR(255),
    arrival_time INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы городских локаций
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    address VARCHAR(500) NOT NULL,
    district VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(50),
    working_hours TEXT,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы районов
CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    population INTEGER,
    area_km2 DECIMAL(10, 2),
    description TEXT,
    color VARCHAR(50)
);

-- Вставка данных по районам Ижевска
INSERT INTO districts (name, population, area_km2, color) VALUES
('Устиновский', 170000, 45.2, 'bg-primary'),
('Ленинский', 145000, 38.5, 'bg-secondary'),
('Октябрьский', 125000, 32.1, 'bg-accent'),
('Индустриальный', 95000, 28.7, 'bg-purple-500'),
('Первомайский', 110000, 35.4, 'bg-pink-500')
ON CONFLICT (name) DO NOTHING;

-- Вставка примеров событий
INSERT INTO events (title, description, category, date, time, location, location_address, price) VALUES
('Фестиваль «Ижевская зима»', 'Масштабный зимний фестиваль с катанием на коньках, ярмаркой и концертами', 'Фестиваль', '2026-01-15', '12:00', 'Центральная площадь', 'пл. Центральная, 1', 0),
('Выставка современного искусства', 'Коллекция работ современных художников Удмуртии', 'Выставка', '2026-01-18', '18:00', 'Музей Калашникова', 'ул. Бородина, 19', 150),
('Концерт симфонического оркестра', 'Произведения Чайковского и Рахманинова', 'Концерт', '2026-01-22', '19:00', 'Театр оперы и балета', 'ул. Пушкина, 12', 500)
ON CONFLICT DO NOTHING;

-- Вставка транспортных маршрутов
INSERT INTO transport_routes (route_number, route_name, transport_type, color) VALUES
('24', 'Ижсталь - Центр', 'Автобус', 'bg-primary'),
('15', 'Воткинское шоссе - Аэропорт', 'Троллейбус', 'bg-secondary'),
('8', 'Автозаводская - Центральная площадь', 'Автобус', 'bg-accent')
ON CONFLICT DO NOTHING;

-- Вставка текущих позиций транспорта
INSERT INTO transport_live (route_id, current_location, next_stop, arrival_time, status) VALUES
(1, 'ул. Пушкинская', 'Центральная площадь', 2, 'В пути'),
(2, 'ул. Удмуртская', 'Аэропорт', 7, 'Приближается'),
(3, 'ул. Автозаводская', 'Центр', 12, 'В пути')
ON CONFLICT DO NOTHING;

-- Вставка популярных локаций
INSERT INTO locations (name, category, address, district, icon, phone) VALUES
('МФЦ Центральный', 'Услуги', 'ул. Пушкинская, 278', 'Устиновский', 'Building2', '+7 (3412) 555-100'),
('Поликлиника №1', 'Здоровье', 'ул. Удмуртская, 261', 'Ленинский', 'Heart', '+7 (3412) 555-200'),
('Парк Кирова', 'Отдых', 'ул. Кирова, 135', 'Октябрьский', 'TreePine', NULL),
('Музей Калашникова', 'Культура', 'ул. Бородина, 19', 'Устиновский', 'Landmark', '+7 (3412) 555-300')
ON CONFLICT DO NOTHING;