"use client";

import { useState, type FormEvent } from "react";
import {
  Bell,
  Globe,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COUNTRIES = [
  "Nigeria",
  "Kenya",
  "South Africa",
  "Ghana",
  "Egypt",
  "Morocco",
  "Ethiopia",
  "Tanzania",
  "Senegal",
  "Uganda",
];

export default function ProfilePage() {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Amara Okafor",
    email: "amara.okafor@example.com",
    bio: "Civic enthusiast tracking public opinion across West Africa. Believer in data-driven democracy.",
    country: "Nigeria",
    phone: "+234 803 123 4567",
  });

  // Preferences state
  const [prefs, setPrefs] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
  });

  // Security state
  const [security, setSecurity] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  const [securityMsg, setSecurityMsg] = useState<string | null>(null);

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const onProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingProfile(true);
    window.setTimeout(() => setSavingProfile(false), 1200);
  };

  const onPrefsSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingPrefs(true);
    window.setTimeout(() => setSavingPrefs(false), 1200);
  };

  const onSecuritySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (security.next !== security.confirm) {
      setSecurityMsg("Passwords do not match.");
      return;
    }
    setSavingSecurity(true);
    window.setTimeout(() => {
      setSavingSecurity(false);
      setSecurityMsg("Password updated successfully.");
      setSecurity({ current: "", next: "", confirm: "" });
      window.setTimeout(() => setSecurityMsg(null), 3000);
    }, 1200);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-18">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Profile header */}
          <Card className="overflow-hidden">
            {/* Banner */}
            <div className="h-28 bg-gradient-to-r from-primary to-secondary sm:h-32" />
            <CardContent className="-mt-12 pb-6 sm:-mt-14">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end">
                <Avatar className="h-24 w-24 ring-4 ring-background shadow-md sm:h-28 sm:w-28">
                  <AvatarImage src="" alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-2xl font-bold tracking-tight">
                      {profile.name}
                    </h1>
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {profile.email}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {profile.country}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="gap-1.5">
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-1.5">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-1.5">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onProfileSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <div className="relative">
                          <UserIcon
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) =>
                              setProfile((p) => ({ ...p, name: e.target.value }))
                            }
                            className="pl-9"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              setProfile((p) => ({ ...p, email: e.target.value }))
                            }
                            className="pl-9"
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <div className="relative">
                          <Globe
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <select
                            id="country"
                            value={profile.country}
                            onChange={(e) =>
                              setProfile((p) => ({ ...p, country: e.target.value }))
                            }
                            className="flex h-10 w-full appearance-none rounded-lg border border-input bg-background pl-9 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="relative">
                          <Phone
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile((p) => ({ ...p, phone: e.target.value }))
                            }
                            className="pl-9"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={profile.bio}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, bio: e.target.value }))
                        }
                        className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Tell the community about yourself…"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={savingProfile} className="gap-1.5">
                        {savingProfile ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving…
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notification preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onPrefsSubmit} className="space-y-1">
                    <PrefRow
                      title="Email notifications"
                      description="Receive emails about poll results, replies, and mentions."
                      checked={prefs.emailNotifications}
                      onCheckedChange={(v) =>
                        setPrefs((p) => ({ ...p, emailNotifications: v }))
                      }
                    />
                    <Separator />
                    <PrefRow
                      title="Push notifications"
                      description="Get real-time alerts on your device for live results."
                      checked={prefs.pushNotifications}
                      onCheckedChange={(v) =>
                        setPrefs((p) => ({ ...p, pushNotifications: v }))
                      }
                    />
                    <Separator />
                    <PrefRow
                      title="Weekly digest"
                      description="A Sunday summary of trending polls and top stories."
                      checked={prefs.weeklyDigest}
                      onCheckedChange={(v) =>
                        setPrefs((p) => ({ ...p, weeklyDigest: v }))
                      }
                    />

                    <div className="mt-6 flex justify-end">
                      <Button type="submit" disabled={savingPrefs} className="gap-1.5">
                        {savingPrefs ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving…
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save preferences
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSecuritySubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current password</Label>
                      <div className="relative">
                        <Lock
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <Input
                          id="current-password"
                          type="password"
                          autoComplete="current-password"
                          required
                          value={security.current}
                          onChange={(e) =>
                            setSecurity((s) => ({ ...s, current: e.target.value }))
                          }
                          className="pl-9"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New password</Label>
                        <div className="relative">
                          <Lock
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="new-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={security.next}
                            onChange={(e) =>
                              setSecurity((s) => ({ ...s, next: e.target.value }))
                            }
                            className="pl-9"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm password</Label>
                        <div className="relative">
                          <Lock
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                          />
                          <Input
                            id="confirm-password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={security.confirm}
                            onChange={(e) =>
                              setSecurity((s) => ({ ...s, confirm: e.target.value }))
                            }
                            className="pl-9"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>

                    {securityMsg && (
                      <p
                        role="alert"
                        className={
                          securityMsg.includes("not match")
                            ? "text-sm font-medium text-destructive"
                            : "text-sm font-medium text-secondary"
                        }
                      >
                        {securityMsg}
                      </p>
                    )}

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={savingSecurity}
                        className="gap-1.5"
                      >
                        {savingSecurity ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Updating…
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4" />
                            Update password
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PrefRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium text-foreground">{title}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={title} />
    </div>
  );
}
