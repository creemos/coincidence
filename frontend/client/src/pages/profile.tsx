import { useState, useEffect, useRef } from "react";
import { Edit, Save, X, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProfileData {
  name: string;
  age: string;
  bio: string;
  photo: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: "",
    bio: "",
    photo: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>({
    name: "",
    age: "",
    bio: "",
    photo: ""
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Загрузка данных из LocalStorage при монтировании компонента
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setEditForm(parsedProfile);
    }
  }, []);

  // Сохранение данных в LocalStorage
  const saveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(editForm));
    setProfile(editForm);
    setIsEditing(false);
  };

  // Отмена редактирования
  const cancelEdit = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  // Загрузка фото и конвертация в base64
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditForm(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Получение инициалов для аватара
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Компонент аватара
  const Avatar = ({ size = "w-32 h-32" }: { size?: string }) => {
    if (profile.photo) {
      return (
        <img
          src={profile.photo}
          alt="Profile"
          className={`${size} rounded-full object-cover border-4 border-border`}
        />
      );
    }

    return (
      <div className={`${size} rounded-full bg-muted border-4 border-border flex items-center justify-center`}>
        <span className="text-2xl font-bold text-muted-foreground">
          {getInitials(profile.name)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {!isEditing ? (
          // Режим просмотра профиля
          <div className="bg-card rounded-2xl card-shadow overflow-hidden">
            <div className="p-8">
              {/* Аватар и основная информация */}
              <div className="flex flex-col items-center text-center mb-8">
                <Avatar />
                <h1 className="text-3xl font-bold text-foreground mt-4">
                  {profile.name || "Ваше имя"}
                </h1>
                {profile.age && (
                  <p className="text-xl text-muted-foreground">
                    {profile.age} лет
                  </p>
                )}
              </div>

              {/* Описание */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3">О себе</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio || "Расскажите о себе, что вас интересует и что вы ищете..."}
                </p>
              </div>

              {/* Кнопка редактирования */}
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full btn-primary text-primary-foreground py-3 rounded-xl font-semibold"
                data-testid="button-edit-profile"
              >
                <Edit className="w-4 h-4 mr-2" />
                Редактировать профиль
              </Button>
            </div>
          </div>
        ) : (
          // Режим редактирования
          <div className="bg-card rounded-2xl card-shadow overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Редактирование профиля
              </h2>

              {/* Загрузка фото */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  {editForm.photo ? (
                    <img
                      src={editForm.photo}
                      alt="Profile preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-border"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-muted border-4 border-border flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {getInitials(editForm.name)}
                      </span>
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="button-upload-photo"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  data-testid="input-photo-upload"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Нажмите на камеру, чтобы загрузить фото
                </p>
              </div>

              {/* Форма редактирования */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Имя
                  </Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Введите ваше имя"
                    className="mt-1"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="age" className="text-sm font-medium text-foreground">
                    Возраст
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Введите ваш возраст"
                    className="mt-1"
                    data-testid="input-age"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm font-medium text-foreground">
                    О себе
                  </Label>
                  <Textarea
                    id="bio"
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Расскажите о себе, своих интересах и хобби..."
                    rows={4}
                    className="mt-1 resize-none"
                    data-testid="textarea-bio"
                  />
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex space-x-4 mt-8">
                <Button
                  onClick={saveProfile}
                  className="flex-1 btn-primary text-primary-foreground py-3 rounded-xl font-semibold"
                  data-testid="button-save-profile"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить
                </Button>
                <Button
                  onClick={cancelEdit}
                  variant="outline"
                  className="flex-1 py-3 rounded-xl font-semibold"
                  data-testid="button-cancel-edit"
                >
                  <X className="w-4 h-4 mr-2" />
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}