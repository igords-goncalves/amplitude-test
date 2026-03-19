"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";
import { ampli } from "@/ampli";
import * as amplitude from '@amplitude/unified';

const japaneseCities = [
  { value: "tokyo", label: "東京 (Tokyo)" },
  { value: "osaka", label: "大阪 (Osaka)" },
  { value: "kyoto", label: "京都 (Kyoto)" },
  { value: "sapporo", label: "札幌 (Sapporo)" },
  { value: "fukuoka", label: "福岡 (Fukuoka)" },
];

export default function Home() {
  const { theme, setTheme } = useTheme();

  const handleButtonClick = () => {
    const logMessage = "こんにちは、イベントが発生しました (Hello, an event has occurred)";
    console.log(logMessage);
    ampli.logMessageTriggered({
      label: "アクションを実行 (Execute Action)",
      log_message: logMessage
    })
  };

  const handleCityChange = (value: string | null) => {
    if (!value) return;
    const city = japaneseCities.find((c) => c.value === value);
    console.log(`都市が選択されました (City selected): ${city?.label}`);
  };

  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    console.log(`テーマが変更されました (Theme changed): ${newTheme}`);

    amplitude.track("Theme Switched", {
      theme: newTheme,
    })
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <main className="flex flex-col items-center gap-12 p-8 max-w-md w-full">
        <header className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Amplitude Test
          </h1>
          <p className="text-muted-foreground mt-2">
            ユーザーアクションのシミュレーション (User Action Simulation)
          </p>
        </header>

        <div className="flex flex-col gap-8 w-full">
          {/* Action Button */}
          <section className="flex flex-col gap-3">
            <Label className="text-sm font-medium">アクションボタン (Action Button)</Label>
            <Button onClick={handleButtonClick} className="w-full">
              アクションを実行 (Execute Action)
            </Button>
          </section>

          {/* City Select */}
          <section className="flex flex-col gap-3">
            <Label className="text-sm font-medium">都市を選択 (Select City)</Label>
            <Select onValueChange={handleCityChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="都市を選んでください (Please select a city)" />
              </SelectTrigger>
              <SelectContent>
                {japaneseCities.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>

          {/* Theme Toggle */}
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Label className="text-sm font-medium">テーマ切替 (Theme Toggle)</Label>
              <Moon className="h-4 w-4" />
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeToggle}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
