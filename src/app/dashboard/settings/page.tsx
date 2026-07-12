"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Download,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  // Account form state
  const [account, setAccount] = useState({
    name: "Amara Okafor",
    email: "amara@example.com",
    bio: "Civic engagement enthusiast tracking public opinion across Africa.",
    country: "Nigeria",
    phone: "+234 803 000 0000",
  });
  const [saved, setSaved] = useState(false);

  const handleAccountChange = (field: keyof typeof account, value: string) => {
    setAccount((prev) => ({ ...prev, [field]: value }));
    if (saved) setSaved(false);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  // Notification preferences
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    push: true,
    weeklyDigest: false,
    pollReminders: true,
  });

  // Privacy preferences
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showVotingHistory: false,
  });
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    window.setTimeout(() => setExporting(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, notifications, and privacy preferences.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Account tab */}
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border border-border">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-xl font-semibold text-white">
                    AO
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Account information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSave} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      Full name
                    </Label>
                    <Input
                      id="name"
                      value={account.name}
                      onChange={(e) => handleAccountChange("name", e.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={account.email}
                      onChange={(e) => handleAccountChange("email", e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    value={account.bio}
                    onChange={(e) => handleAccountChange("bio", e.target.value)}
                    placeholder="Tell others a bit about yourself"
                    className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={account.country}
                      onChange={(e) => handleAccountChange("country", e.target.value)}
                      placeholder="Your country"
                      autoComplete="country-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={account.phone}
                      onChange={(e) => handleAccountChange("phone", e.target.value)}
                      placeholder="+234 ..."
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    className={cn(
                      "flex items-center gap-1.5 text-sm transition-opacity duration-200",
                      saved ? "text-secondary opacity-100" : "opacity-0"
                    )}
                    aria-live="polite"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Changes saved successfully.
                  </p>
                  <Button type="submit" className="gap-1.5">
                    <Save className="h-4 w-4" />
                    Save changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <ToggleRow
                title="Email notifications"
                description="Receive notifications about new polls and results via email."
                checked={notifPrefs.email}
                onCheckedChange={(v) =>
                  setNotifPrefs((p) => ({ ...p, email: v }))
                }
              />
              <Separator />
              <ToggleRow
                title="Push notifications"
                description="Get real-time alerts on your device."
                checked={notifPrefs.push}
                onCheckedChange={(v) =>
                  setNotifPrefs((p) => ({ ...p, push: v }))
                }
              />
              <Separator />
              <ToggleRow
                title="Weekly digest"
                description="A weekly summary of trending polls and your activity."
                checked={notifPrefs.weeklyDigest}
                onCheckedChange={(v) =>
                  setNotifPrefs((p) => ({ ...p, weeklyDigest: v }))
                }
              />
              <Separator />
              <ToggleRow
                title="Poll reminders"
                description="Reminders for polls you haven't voted on yet."
                checked={notifPrefs.pollReminders}
                onCheckedChange={(v) =>
                  setNotifPrefs((p) => ({ ...p, pollReminders: v }))
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy tab */}
        <TabsContent value="privacy" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Privacy & data</CardTitle>
              <CardDescription>
                Control your visibility and manage your data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <ToggleRow
                title="Public profile"
                description="Allow other users to view your profile."
                icon={Globe}
                checked={privacy.profileVisible}
                onCheckedChange={(v) =>
                  setPrivacy((p) => ({ ...p, profileVisible: v }))
                }
              />
              <Separator />
              <ToggleRow
                title="Show voting history"
                description="Display the polls you've voted on publicly on your profile."
                icon={Lock}
                checked={privacy.showVotingHistory}
                onCheckedChange={(v) =>
                  setPrivacy((p) => ({ ...p, showVotingHistory: v }))
                }
              />
              <Separator />
              <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Export your data
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of your account data and voting history.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="gap-1.5"
                  onClick={handleExport}
                  disabled={exporting}
                >
                  <Download className="h-4 w-4" />
                  {exporting ? "Preparing…" : "Export data"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  icon: Icon,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  icon?: typeof Globe;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
          {title}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={title} />
    </div>
  );
}
