import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const transportData = [
    { 
      route: '№ 24', 
      name: 'Ижсталь - Центр', 
      time: '2 мин', 
      status: 'В пути',
      color: 'bg-primary'
    },
    { 
      route: '№ 15', 
      name: 'Воткинское шоссе - Аэропорт', 
      time: '7 мин', 
      status: 'Приближается',
      color: 'bg-secondary'
    },
    { 
      route: '№ 8', 
      name: 'Автозаводская - Центральная площадь', 
      time: '12 мин', 
      status: 'В пути',
      color: 'bg-accent'
    },
  ];

  const events = [
    {
      title: 'Фестиваль «Ижевская зима»',
      date: '15 января',
      time: '12:00',
      location: 'Центральная площадь',
      category: 'Фестиваль',
      image: 'festival'
    },
    {
      title: 'Выставка современного искусства',
      date: '18 января',
      time: '18:00',
      location: 'Музей Калашникова',
      category: 'Выставка',
      image: 'art'
    },
    {
      title: 'Концерт симфонического оркестра',
      date: '22 января',
      time: '19:00',
      location: 'Театр оперы и балета',
      category: 'Концерт',
      image: 'music'
    },
  ];

  const locations = [
    { name: 'МФЦ Центральный', address: 'ул. Пушкинская, 278', category: 'Услуги', icon: 'Building2' },
    { name: 'Поликлиника №1', address: 'ул. Удмуртская, 261', category: 'Здоровье', icon: 'Heart' },
    { name: 'Парк Кирова', address: 'ул. Кирова, 135', category: 'Отдых', icon: 'TreePine' },
    { name: 'Музей Калашникова', address: 'ул. Бородина, 19', category: 'Культура', icon: 'Landmark' },
  ];

  const districts = [
    { name: 'Устиновский', population: '170 тыс.', color: 'bg-primary' },
    { name: 'Ленинский', population: '145 тыс.', color: 'bg-secondary' },
    { name: 'Октябрьский', population: '125 тыс.', color: 'bg-accent' },
    { name: 'Индустриальный', population: '95 тыс.', color: 'bg-purple-500' },
    { name: 'Первомайский', population: '110 тыс.', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-purple-blue flex items-center justify-center">
                <Icon name="MapPin" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Ижевск-Гид
                </h1>
                <p className="text-xs text-muted-foreground">Твой город в кармане</p>
              </div>
            </div>
            <Button size="sm" className="gradient-orange-pink text-white border-0">
              <Icon name="Bell" size={16} className="mr-2" />
              Уведомления
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <section className="animate-fade-in">
          <Card className="p-6 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-2 border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Привет, горожанин! 👋</h2>
                <p className="text-muted-foreground">Исследуй Ижевск с умным помощником</p>
              </div>
              <Button className="gradient-purple-blue text-white border-0" size="lg">
                <Icon name="Sparkles" size={20} className="mr-2" />
                SOS
              </Button>
            </div>
          </Card>
        </section>

        <Tabs defaultValue="transport" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card">
            <TabsTrigger value="transport" className="data-[state=active]:gradient-purple-blue data-[state=active]:text-white">
              <Icon name="Bus" size={18} />
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:gradient-purple-blue data-[state=active]:text-white">
              <Icon name="Calendar" size={18} />
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:gradient-purple-blue data-[state=active]:text-white">
              <Icon name="Map" size={18} />
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:gradient-purple-blue data-[state=active]:text-white">
              <Icon name="Briefcase" size={18} />
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:gradient-purple-blue data-[state=active]:text-white">
              <Icon name="Users" size={18} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transport" className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Транспорт в реальном времени</h3>
              <Badge className="gradient-orange-pink text-white border-0 pulse-glow">
                <Icon name="Radio" size={14} className="mr-1" />
                Live
              </Badge>
            </div>
            
            <div className="grid gap-4">
              {transportData.map((transport, idx) => (
                <Card key={idx} className="p-4 hover:scale-[1.02] transition-transform duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl ${transport.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">{transport.route}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{transport.name}</h4>
                        <p className="text-sm text-muted-foreground">{transport.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{transport.time}</p>
                      <Button variant="ghost" size="sm">
                        <Icon name="MapPinned" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 gradient-purple-blue">
              <div className="flex items-center gap-3 text-white">
                <Icon name="AlertCircle" size={24} />
                <div>
                  <p className="font-semibold">Перекрытие движения</p>
                  <p className="text-sm opacity-90">ул. Удмуртская: ремонт до 20 января</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Афиша мероприятий</h3>
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={16} className="mr-2" />
                Фильтры
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event, idx) => (
                <Card key={idx} className="overflow-hidden hover:scale-[1.02] transition-transform duration-200">
                  <div className="h-40 gradient-orange-pink flex items-center justify-center">
                    <Icon name="Sparkles" size={64} className="text-white/30" />
                  </div>
                  <div className="p-4 space-y-2">
                    <Badge className="bg-primary/20 text-primary">{event.category}</Badge>
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        {event.date} в {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={14} />
                        {event.location}
                      </div>
                    </div>
                    <Button className="w-full mt-2 gradient-purple-blue text-white border-0">
                      Купить билет
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Интерактивная карта</h3>
              <Button variant="outline" size="sm">
                <Icon name="Scan" size={16} className="mr-2" />
                AR-режим
              </Button>
            </div>

            <Card className="p-6 h-96 gradient-purple-blue/10 border-2 border-primary/30 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Icon name="MapPinned" size={64} className="mx-auto text-primary" />
                <p className="text-lg font-semibold">Карта города</p>
                <p className="text-muted-foreground">Интерактивная навигация с фильтрами</p>
              </div>
            </Card>

            <div className="grid gap-3">
              <h4 className="font-semibold">Популярные места</h4>
              {locations.map((location, idx) => (
                <Card key={idx} className="p-4 hover:scale-[1.01] transition-transform">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon name={location.icon as any} size={20} className="text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold">{location.name}</h5>
                        <p className="text-sm text-muted-foreground">{location.address}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{location.category}</Badge>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-5 gap-3">
              <h4 className="font-semibold md:col-span-5">Районы Ижевска</h4>
              {districts.map((district, idx) => (
                <Card key={idx} className={`p-4 ${district.color}/20 border-2 border-current hover:scale-105 transition-transform`}>
                  <h5 className="font-semibold mb-1">{district.name}</h5>
                  <p className="text-xs text-muted-foreground">{district.population}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-4 animate-slide-up">
            <h3 className="text-2xl font-bold">Городские услуги</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-purple-blue flex items-center justify-center">
                    <Icon name="Calendar" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Запись в МФЦ</h4>
                    <p className="text-sm text-muted-foreground">Онлайн-запись без очереди</p>
                  </div>
                </div>
                <Button className="w-full gradient-purple-blue text-white border-0">Записаться</Button>
              </Card>

              <Card className="p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-orange-pink flex items-center justify-center">
                    <Icon name="Stethoscope" size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Запись в поликлинику</h4>
                    <p className="text-sm text-muted-foreground">К врачу за 2 клика</p>
                  </div>
                </div>
                <Button className="w-full gradient-orange-pink text-white border-0">К врачу</Button>
              </Card>

              <Card className="p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Icon name="Wallet" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Оплата ЖКХ</h4>
                    <p className="text-sm text-muted-foreground">Коммунальные платежи</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">Оплатить</Button>
              </Card>

              <Card className="p-6 hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Icon name="FileText" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Госуслуги</h4>
                    <p className="text-sm text-muted-foreground">Подача заявлений</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">Перейти</Button>
              </Card>
            </div>

            <Card className="p-4 bg-secondary/10 border-secondary/30">
              <div className="flex items-center gap-3">
                <Icon name="Zap" size={24} className="text-secondary" />
                <div>
                  <p className="font-semibold">Плановые отключения</p>
                  <p className="text-sm text-muted-foreground">Завтра 10:00-14:00: отключение воды на ул. Пушкинская</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-4 animate-slide-up">
            <h3 className="text-2xl font-bold">Сообщество</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 text-center hover:scale-[1.02] transition-transform">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Форум</h4>
                <p className="text-sm text-muted-foreground mb-4">Общение по районам</p>
                <Button variant="outline" className="w-full">Открыть</Button>
              </Card>

              <Card className="p-6 text-center hover:scale-[1.02] transition-transform">
                <Icon name="Megaphone" size={48} className="mx-auto mb-3 text-secondary" />
                <h4 className="font-semibold mb-2">Объявления</h4>
                <p className="text-sm text-muted-foreground mb-4">Доска объявлений</p>
                <Button variant="outline" className="w-full">Посмотреть</Button>
              </Card>

              <Card className="p-6 text-center hover:scale-[1.02] transition-transform">
                <Icon name="Star" size={48} className="mx-auto mb-3 text-accent" />
                <h4 className="font-semibold mb-2">Рейтинги</h4>
                <p className="text-sm text-muted-foreground mb-4">Отзывы о бизнесе</p>
                <Button variant="outline" className="w-full">Смотреть</Button>
              </Card>
            </div>

            <Card className="p-6 gradient-orange-pink/20 border-accent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon name="Trophy" size={32} className="text-accent" />
                  <div>
                    <h4 className="font-semibold">Челлендж «Чистый двор»</h4>
                    <p className="text-sm text-muted-foreground">Участвуйте и выигрывайте призы!</p>
                  </div>
                </div>
                <Button className="gradient-orange-pink text-white border-0">Участвовать</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2026 Ижевск-Гид. Единый городской сервис</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <button className="hover:text-primary transition-colors">О проекте</button>
            <button className="hover:text-primary transition-colors">Поддержка</button>
            <button className="hover:text-primary transition-colors">Контакты</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
