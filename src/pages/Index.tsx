import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const movies = [
  { id: 1, title: 'Зверополис 2', time: '10:30', duration: '109 мин', rating: '6+', genre: 'Анимация', featured: false },
  { id: 2, title: 'Чебурашка 2', time: '13:00', duration: '95 мин', rating: '0+', genre: 'Семейный', featured: true, poster: 'https://cdn.poehali.dev/projects/fd304f8b-6a54-455c-849a-73c437824ea1/bucket/a9fef8e1-e3a0-4d2e-b594-f18580532e0f.jpg' },
  { id: 3, title: 'Папа может', time: '14:55', duration: '102 мин', rating: '12+', genre: 'Комедия', featured: false },
  { id: 4, title: 'Буратино', time: '17:05', duration: '118 мин', rating: '6+', genre: 'Фэнтези', featured: false },
  { id: 5, title: 'Чебурашка 2', time: '19:00', duration: '95 мин', rating: '0+', genre: 'Семейный', featured: true, poster: 'https://cdn.poehali.dev/projects/fd304f8b-6a54-455c-849a-73c437824ea1/bucket/a9fef8e1-e3a0-4d2e-b594-f18580532e0f.jpg' },
  { id: 6, title: 'Простоквашино', time: '21:00', duration: '88 мин', rating: '0+', genre: 'Анимация', featured: false },
  { id: 7, title: 'Возвращение в Сайлент Хилл', time: '23:00', duration: '127 мин', rating: '18+', genre: 'Ужасы', featured: false },
];

const comingSoon = [
  { id: 1, title: 'Папа может', duration: '102 мин', rating: '12+', genre: 'Комедия', premiere: '5 февраля', description: 'Трогательная комедия о семейных ценностях' },
];

const cinemaBar = [
  { id: 1, name: 'Попкорн маленький', price: 150, category: 'Попкорн' },
  { id: 2, name: 'Попкорн средний', price: 250, category: 'Попкорн' },
  { id: 3, name: 'Попкорн большой', price: 350, category: 'Попкорн' },
  { id: 4, name: 'Кока-Кола', price: 125, category: 'Напитки' },
  { id: 5, name: 'Фанта', price: 125, category: 'Напитки' },
  { id: 6, name: 'Пепси', price: 125, category: 'Напитки' },
  { id: 7, name: 'Сладкая вата', price: 250, category: 'Сладости' },
];

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<typeof movies[0] | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState('schedule');

  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((s) => s !== seatNumber) : [...prev, seatNumber]
    );
  };

  const seats = Array.from({ length: 48 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Film" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Greenwich Cinema</h1>
                <p className="text-xs text-muted-foreground">Екатеринбург, ул. 8 Марта, 26</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>9:00 - 01:00</span>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Phone" size={16} className="mr-2" />
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-[73px] z-40 backdrop-blur-lg bg-card/90 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'schedule', label: 'Расписание', icon: 'Calendar' },
              { id: 'booking', label: 'Бронирование', icon: 'Ticket' },
              { id: 'bar', label: 'Кинобар', icon: 'Popcorn' },
              { id: 'about', label: 'О кинотеатре', icon: 'Info' },
              { id: 'contacts', label: 'Контакты', icon: 'MapPin' },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection(item.id)}
                className="whitespace-nowrap"
              >
                <Icon name={item.icon as any} size={16} className="mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'schedule' && (
          <div className="animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl mb-8 animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-sm"></div>
              <div className="relative p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1">
                    <Badge className="bg-white/20 text-white border-white/40 backdrop-blur-sm mb-3">
                      <Icon name="Sparkles" size={16} className="mr-1" />
                      Скоро в кино
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Папа может
                    </h2>
                    <p className="text-white/90 mb-3">
                      Трогательная комедия о семейных ценностях
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-white/30 text-white backdrop-blur-sm border-white/40">
                        Комедия
                      </Badge>
                      <Badge className="bg-white/30 text-white backdrop-blur-sm border-white/40">
                        12+
                      </Badge>
                      <Badge className="bg-white/30 text-white backdrop-blur-sm border-white/40">
                        102 мин
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-white">
                        <Icon name="Calendar" size={20} />
                        <span className="text-xl font-bold">С 5 февраля</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-600 hover:bg-white/90 shadow-xl font-bold"
                  >
                    <Icon name="Bell" size={20} className="mr-2" />
                    Уведомить о премьере
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl mb-12 animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 via-amber-500/90 to-green-500/90 backdrop-blur-sm"></div>
              <div className="relative grid md:grid-cols-2 gap-6 p-8">
                <div className="flex flex-col justify-center space-y-4">
                  <Badge className="bg-white/20 text-white border-white/40 w-fit backdrop-blur-sm">
                    <Icon name="Star" size={16} className="mr-1" />
                    Премьера
                  </Badge>
                  <h2 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Чебурашка 2
                  </h2>
                  <p className="text-xl text-white/90 drop-shadow-md">
                    Возвращение любимого героя в новом приключении!
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Badge className="bg-white/30 text-white backdrop-blur-sm border-white/40">
                      Семейный
                    </Badge>
                    <Badge className="bg-white/30 text-white backdrop-blur-sm border-white/40">
                      0+
                    </Badge>
                    <Badge className="bg-white/30 text-white backdrop-blur-sm border-white/40">
                      95 мин
                    </Badge>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-orange-600 hover:bg-white/90 shadow-xl font-bold"
                      onClick={() => {
                        setSelectedMovie(movies.find(m => m.id === 2) || null);
                        setShowBooking(true);
                      }}
                    >
                      <Icon name="Ticket" size={20} className="mr-2" />
                      Забронировать
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-white/20 text-white border-white/40 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Icon name="Play" size={20} className="mr-2" />
                      Трейлер
                    </Button>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <img 
                    src="https://cdn.poehali.dev/projects/fd304f8b-6a54-455c-849a-73c437824ea1/bucket/a9fef8e1-e3a0-4d2e-b594-f18580532e0f.jpg"
                    alt="Чебурашка 2"
                    className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Расписание сеансов</h2>
              <p className="text-muted-foreground capitalize">{currentDate}</p>
              <Badge variant="secondary" className="mt-2">
                Действует до 19 февраля
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {movies.filter(movie => !movie.isComingSoon).map((movie, index) => (
                <Card
                  key={movie.id}
                  className={`group p-6 transition-all duration-300 cursor-pointer hover:scale-105 border-2 ${
                    movie.featured 
                      ? 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-300 dark:border-orange-700 hover:shadow-2xl hover:shadow-orange-500/30' 
                      : 'hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setShowBooking(true);
                  }}
                >
                  {movie.featured && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
                      <Icon name="Star" size={12} />
                      ХИТ
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 transition-colors ${
                        movie.featured 
                          ? 'text-orange-600 dark:text-orange-400 group-hover:text-orange-700' 
                          : 'group-hover:text-primary'
                      }`}>
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={movie.featured ? "default" : "outline"} className={movie.featured ? 'bg-orange-500' : ''}>
                          {movie.genre}
                        </Badge>
                        <Badge variant="secondary">{movie.rating}</Badge>
                      </div>
                    </div>
                    <Icon
                      name="ChevronRight"
                      size={24}
                      className={`transition-colors ${
                        movie.featured 
                          ? 'text-orange-500 group-hover:text-orange-600' 
                          : 'text-muted-foreground group-hover:text-primary'
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span className="text-sm">{movie.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} className={movie.featured ? 'text-orange-500' : 'text-primary'} />
                        <span className={`text-2xl font-bold ${movie.featured ? 'text-orange-600 dark:text-orange-400' : 'text-primary'}`}>
                          {movie.time}
                        </span>
                      </div>
                      <Button size="sm" variant={movie.featured ? "default" : "secondary"} className={movie.featured ? 'bg-orange-500 hover:bg-orange-600' : ''}>
                        Забронировать
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'booking' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Бронирование мест</h2>
              <p className="text-muted-foreground">Выберите фильм из расписания для бронирования</p>
            </div>

            <Card className="p-8">
              <div className="text-center py-12">
                <Icon name="Ticket" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Перейдите в раздел "Расписание" и выберите нужный сеанс
                </p>
                <Button className="mt-4" onClick={() => setActiveSection('schedule')}>
                  Посмотреть расписание
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'bar' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Кинобар</h2>
              <p className="text-muted-foreground">Закажите угощения к фильму</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">Всё меню</TabsTrigger>
                <TabsTrigger value="popcorn">Попкорн</TabsTrigger>
                <TabsTrigger value="drinks">Напитки</TabsTrigger>
                <TabsTrigger value="sweets">Сладости</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cinemaBar.map((item, index) => (
                  <Card
                    key={item.id}
                    className="p-6 hover:shadow-xl hover:shadow-secondary/20 transition-all duration-300 hover:scale-105 border-2 hover:border-secondary/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <Icon name="ShoppingCart" size={20} className="text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-accent">{item.price} ₽</span>
                      <Button size="sm" variant="secondary">
                        Добавить
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="popcorn" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cinemaBar
                  .filter((item) => item.category === 'Попкорн')
                  .map((item) => (
                    <Card key={item.id} className="p-6">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-accent">{item.price} ₽</span>
                        <Button size="sm" variant="secondary">
                          Добавить
                        </Button>
                      </div>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="drinks" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cinemaBar
                  .filter((item) => item.category === 'Напитки')
                  .map((item) => (
                    <Card key={item.id} className="p-6">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-accent">{item.price} ₽</span>
                        <Button size="sm" variant="secondary">
                          Добавить
                        </Button>
                      </div>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="sweets" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cinemaBar
                  .filter((item) => item.category === 'Сладости')
                  .map((item) => (
                    <Card key={item.id} className="p-6">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-accent">{item.price} ₽</span>
                        <Button size="sm" variant="secondary">
                          Добавить
                        </Button>
                      </div>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">О кинотеатре</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-8">
                <Icon name="Film" size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Greenwich Cinema</h3>
                <p className="text-muted-foreground mb-4">
                  Современный кинотеатр в ТЦ Гринвич предлагает комфортный просмотр новинок кино
                  в уютной атмосфере. Качественное изображение, объемный звук и удобные кресла
                  сделают ваш киносеанс незабываемым.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Users" size={20} className="text-primary" />
                    <span>Вместимость зала: 48 мест</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Sparkles" size={20} className="text-primary" />
                    <span>Современное оборудование</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Star" size={20} className="text-primary" />
                    <span>Удобное расположение в центре</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <Icon name="Clock" size={48} className="text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Режим работы</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Ежедневно</p>
                    <p className="text-3xl font-bold text-accent">9:00 - 01:00</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground mb-2">
                      Кассы открываются за 30 минут до первого сеанса
                    </p>
                    <p className="text-muted-foreground">
                      Кинобар работает до окончания последнего сеанса
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Контакты</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-8">
                <Icon name="MapPin" size={48} className="text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Адрес</h3>
                <p className="text-lg mb-2">ТЦ Гринвич</p>
                <p className="text-xl font-semibold text-accent mb-4">г. Екатеринбург, ул. 8 Марта, 26</p>
                <Button variant="outline" className="mt-4">
                  <Icon name="Navigation" size={16} className="mr-2" />
                  Построить маршрут
                </Button>
              </Card>

              <Card className="p-8">
                <Icon name="Phone" size={48} className="text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Связь</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                    <p className="text-xl font-semibold">+7 (343) 123-45-67</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-xl font-semibold">info@greenwich-cinema.ru</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">Мы в соцсетях</p>
                    <div className="flex gap-3">
                      <Button size="icon" variant="outline">
                        <Icon name="MessageCircle" size={20} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Icon name="Instagram" size={20} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Dialog open={showBooking} onOpenChange={setShowBooking}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedMovie?.title} - {selectedMovie?.time}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
                <Icon name="Calendar" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Сеанс</p>
                  <p className="font-semibold">{currentDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Icon name="Clock" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Время</p>
                  <p className="font-semibold">{selectedMovie?.time}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6 text-center">
                <div className="inline-block px-8 py-2 bg-muted rounded-lg mb-4">
                  <Icon name="Monitor" size={32} className="mx-auto text-primary" />
                  <p className="text-xs text-muted-foreground mt-1">ЭКРАН</p>
                </div>
              </div>

              <div className="grid grid-cols-8 gap-2 mb-6">
                {seats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <button
                      key={seat}
                      onClick={() => handleSeatClick(seat)}
                      className={`aspect-square rounded-lg text-sm font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary text-white scale-110 shadow-lg'
                          : 'bg-muted hover:bg-muted-foreground/20 hover:scale-105'
                      }`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-muted"></div>
                  <span className="text-sm">Свободно</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary"></div>
                  <span className="text-sm">Выбрано</span>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <Card className="p-4 bg-accent/10 border-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Выбрано мест:</span>
                    <span className="text-2xl font-bold text-accent">{selectedSeats.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map((seat) => (
                      <Badge key={seat} variant="secondary">
                        Место {seat}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" size="lg">
                    <Icon name="Check" size={20} className="mr-2" />
                    Забронировать ({selectedSeats.length * 350} ₽)
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="mt-16 border-t border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Film" size={24} className="text-white" />
              </div>
              <div>
                <p className="font-bold">Greenwich Cinema</p>
                <p className="text-xs text-muted-foreground">© 2026 Все права защищены</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Екатеринбург, ул. 8 Марта, 26 • 9:00 - 01:00</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;