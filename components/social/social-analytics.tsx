"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, Users, Heart, MessageCircle, Share, Eye } from "lucide-react"

const engagementData = [
  { date: "Jan 1", likes: 120, comments: 45, shares: 23, views: 1200 },
  { date: "Jan 2", likes: 150, comments: 52, shares: 31, views: 1450 },
  { date: "Jan 3", likes: 180, comments: 38, shares: 28, views: 1680 },
  { date: "Jan 4", likes: 220, comments: 65, shares: 42, views: 2100 },
  { date: "Jan 5", likes: 190, comments: 48, shares: 35, views: 1850 },
  { date: "Jan 6", likes: 240, comments: 72, shares: 48, views: 2300 },
  { date: "Jan 7", likes: 280, comments: 85, shares: 55, views: 2650 },
]

const platformData = [
  { platform: "TikTok", followers: 12500, engagement: 8.2, posts: 15, color: "bg-black" },
  {
    platform: "Instagram",
    followers: 15800,
    engagement: 6.4,
    posts: 12,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
  { platform: "YouTube", followers: 8200, engagement: 4.8, posts: 8, color: "bg-red-600" },
  { platform: "LinkedIn", followers: 2800, engagement: 3.2, posts: 6, color: "bg-blue-700" },
  { platform: "Facebook", followers: 3200, engagement: 2.1, posts: 10, color: "bg-blue-600" },
  { platform: "Twitter", followers: 5100, engagement: 1.8, posts: 18, color: "bg-sky-500" },
]

const topPosts = [
  {
    id: 1,
    title: "Behind the Scenes: Video Production",
    platform: "TikTok",
    likes: 2400,
    comments: 180,
    shares: 95,
    views: 15600,
    engagement: 8.2,
  },
  {
    id: 2,
    title: "Client Success Story Highlight",
    platform: "LinkedIn",
    likes: 340,
    comments: 45,
    shares: 28,
    views: 4200,
    engagement: 6.8,
  },
  {
    id: 3,
    title: "Creative Process Timelapse",
    platform: "Instagram",
    likes: 1800,
    comments: 120,
    shares: 65,
    views: 12400,
    engagement: 5.9,
  },
]

export function SocialAnalytics() {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156.2K</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+0.8%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47.6K</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.2%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts Published</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">69</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>Daily engagement metrics for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="likes" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="comments" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="shares" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Follower count by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="followers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Breakdown</CardTitle>
          <CardDescription>Detailed performance metrics by platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformData.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${platform.color} flex items-center justify-center text-white font-bold`}
                  >
                    {platform.platform.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{platform.platform}</h4>
                    <p className="text-sm text-muted-foreground">{platform.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-sm">
                      <span className="font-medium">{platform.engagement}%</span>
                      <span className="text-muted-foreground"> engagement</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">{platform.posts}</span>
                      <span className="text-muted-foreground"> posts</span>
                    </div>
                  </div>
                  <Progress value={platform.engagement * 10} className="w-32 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your best content from the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={post.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{post.platform}</Badge>
                      <span className="text-sm text-muted-foreground">{post.engagement}% engagement</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="h-4 w-4" />
                    <span>{post.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
