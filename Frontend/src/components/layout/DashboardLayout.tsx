import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Briefcase,
  Users,
  Newspaper,
  FolderKanban,
  Calendar,
  PenSquare,
  MessageSquare,
  LogOut,
  GraduationCap,
  Settings,
  Bell,
  ChevronRight,
  Loader2,
  Home
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import OnboardingOverlay from "../OnboardingOverlay";
import { NotificationCenter } from "../NotificationCenter";

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Courses', url: '/courses', icon: BookOpen },
  { title: 'Coding Platform', url: '/coding', icon: Code2 },
  { title: 'Jobs & Internships', url: '/jobs', icon: Briefcase },
  { title: 'Mentors', url: '/mentors', icon: Users },
  { title: 'News & Updates', url: '/news', icon: Newspaper },
  { title: 'Projects', url: '/projects', icon: FolderKanban },
  { title: 'Events', url: '/events', icon: Calendar },
  { title: 'Placements', url: '/placements', icon: Briefcase },
  { title: 'Feedback', url: '/feedback', icon: MessageSquare },
];

function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex items-center justify-center">
            <img src="/brand-logo.png" alt="Prolync Logo" className="h-8 w-8 object-contain" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-sidebar-foreground tracking-tight">Prolync</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {!isCollapsed && 'Main Menu'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        id={`nav-item-${item.title.toLowerCase().replace(/[&]/g, '').replace(/\s+/g, '-')}`}
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive && "bg-primary/10 text-primary font-medium"
                        )}
                        activeClassName="bg-primary/10 text-primary font-medium"
                      >
                        <item.icon className={cn(
                          "h-5 w-5 shrink-0",
                          isActive ? "text-primary" : "text-sidebar-foreground"
                        )} />
                        {!isCollapsed && <span>{item.title}</span>}
                        {!isCollapsed && isActive && (
                          <ChevronRight className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <SidebarMenuButton asChild tooltip="Home Page">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <Home className="h-5 w-5" />
            {!isCollapsed && <span>Home Page</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}



export default function DashboardLayout() {
  const { user, loading, showOnboarding, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen relative">
          {showOnboarding && <OnboardingOverlay />}
          {/* Top header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40 flex items-center px-4 gap-4">
            <SidebarTrigger />
            <div className="flex-1" />

            <div className="flex items-center gap-4">
              <NotificationCenter />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-border/50 hover:bg-accent">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_picture ? `http://localhost:5000${user.profile_picture}` : undefined} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                    <Users className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
