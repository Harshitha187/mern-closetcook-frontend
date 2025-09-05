import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Sparkles, 
  Upload, 
  Send, 
  Camera, 
  Palette, 
  Star, 
  Shirt,
  X
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  image?: string;
  suggestions?: string[];
  timestamp: Date;
}

const Test = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi there! I'm your personal AI style assistant! 🎨 Upload a photo of your outfit or describe what you're wearing, and I'll help you create amazing looks, suggest improvements, or put together new outfits based on your style preferences!",
      suggestions: [
        "Analyze my current outfit",
        "Help me style for a date night",
        "Suggest colors that match",
        "Create a capsule wardrobe"
      ],
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const styleCategories = [
    { icon: Palette, label: "Color Analysis", description: "Get personalized color recommendations" },
    { icon: Shirt, label: "Outfit Builder", description: "Create complete looks from your wardrobe" },
    { icon: Star, label: "Trend Insights", description: "Stay updated with latest fashion trends" },
    { icon: Camera, label: "Style Scanner", description: "Upload photos for instant styling advice" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        
        // Auto-send image analysis request
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'user',
          content: "Please analyze this outfit and give me styling suggestions!",
          image: imageUrl,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        handleAIResponse(userMessage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !uploadedImage) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage || "What do you think of this outfit?",
      image: uploadedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setUploadedImage(null);
    handleAIResponse(userMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    handleAIResponse(userMessage);
  };

  const handleAIResponse = (userMessage: ChatMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let aiResponse: ChatMessage;
      
      if (userMessage.image) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "🔍 I love this outfit! Here's my analysis:\n\n✨ **What's Working Well:**\n• Great color coordination - the tones complement each other beautifully\n• Nice balance of proportions\n• The styling shows good attention to detail\n\n💡 **Styling Suggestions:**\n• Try adding a statement necklace to draw attention upward\n• Consider rolling up the sleeves for a more relaxed vibe\n• A structured blazer could elevate this look for evening events\n\n🌈 **Color Palette Recommendations:**\n• Dusty rose or blush pink would complement this beautifully\n• Navy or deep emerald would create stunning contrast\n• Metallic gold accessories would add warmth",
          suggestions: [
            "Show me similar outfit ideas",
            "What shoes would work with this?",
            "Help me accessorize this look",
            "Create a capsule wardrobe around this style"
          ],
          timestamp: new Date()
        };
      } else if (userMessage.content.toLowerCase().includes('date night')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "💕 Perfect! Let's create a stunning date night look! Here are some romantic yet chic outfit ideas:\n\n🌟 **Classic Elegance:**\n• A midi dress in a rich jewel tone\n• Paired with pointed-toe heels\n• Delicate jewelry and a small clutch\n\n✨ **Modern Romance:**\n• High-waisted trousers with a silk camisole\n• Statement earrings and a blazer\n• Ankle boots or strappy sandals\n\n💫 **Playful Chic:**\n• A flowy skirt with a fitted top\n• Dainty accessories and comfortable wedges\n• A light cardigan for layering",
          suggestions: [
            "What colors work best for date night?",
            "Help me choose the right shoes",
            "Suggest makeup to match",
            "What about casual date outfits?"
          ],
          timestamp: new Date()
        };
      } else if (userMessage.content.toLowerCase().includes('color')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "🎨 Let's explore your perfect color palette! Colors can make or break an outfit, so here's my guide:\n\n🌈 **Universally Flattering:**\n• Navy blue - works with everything\n• Cream and off-white - softer than pure white\n• Dusty rose - romantic and versatile\n• Forest green - rich and sophisticated\n\n💎 **Tips for Color Matching:**\n• Stick to 3 colors max per outfit\n• Use the 60-30-10 rule (dominant, secondary, accent)\n• Consider your skin's undertones\n• Don't be afraid to mix textures in similar tones",
          suggestions: [
            "What's my seasonal color palette?",
            "Help me mix patterns and colors",
            "Suggest a monochromatic outfit",
            "Colors for my skin tone"
          ],
          timestamp: new Date()
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "That's a great question! I'm here to help you with all things fashion and style. Whether you want to:\n\n👗 **Build New Outfits:** I can suggest combinations from your wardrobe\n🎨 **Color Coordination:** Find perfect color matches and palettes\n✨ **Occasion Styling:** Get dressed for any event or season\n📸 **Photo Analysis:** Upload outfit pics for personalized feedback\n\nWhat would you like to explore today?",
          suggestions: [
            "Analyze my style personality",
            "Build a capsule wardrobe", 
            "Seasonal trend recommendations",
            "Mix and match my current clothes"
          ],
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="w-full h-screen sm:minh-screen mx-auto space-y-6 p-10 bg-[url('/src/assets/bg.jpg')] bg-cover bg-center h-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl logo-font gradient-text mb-2">Style AI Assistant</h1>
        <p>Get personalized fashion advice powered by AI</p>
      </div>

      {/* Style Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {styleCategories.map((category) => (
          <Card key={category.label} className="bg-card/90 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/30 transition-all duration-200 cursor-pointer group shadow-lg hover:shadow-xl">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium text-foreground mb-1">{category.label}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="bg-card/90 backdrop-blur-sm border-2 border-primary/10 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Style Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'ai' && (
                  <Avatar className="border-2 border-primary/20 bg-gradient-to-r from-primary to-secondary flex-shrink-0">
                    <AvatarFallback className="text-white">
                      <Sparkles className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted/30 border border-primary/10'
                  }`}>
                    {message.image && (
                      <div className="mb-3 rounded-lg overflow-hidden">
                      </div>
                    )}
                    <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs border-primary/20 hover:bg-primary/10 hover:border-primary/30"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <Avatar className="border-2 border-primary/20 bg-gradient-to-r from-secondary to-accent flex-shrink-0">
                    <AvatarFallback className="text-foreground">You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="border-2 border-primary/20 bg-gradient-to-r from-primary to-secondary flex-shrink-0">
                  <AvatarFallback className="text-white">
                    <Sparkles className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted/30 border border-primary/10 p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-primary/10 pt-4">
            {uploadedImage && (
              <div className="mb-4 relative inline-block">
                <div className="relative rounded-lg overflow-hidden bg-muted/20">
            
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setUploadedImage(null)}
                    className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="chat-image-upload"
              />
              <label
                htmlFor="chat-image-upload"
                className="cursor-pointer"
              >
                <Button variant="outline" size="icon" className="border-2 border-primary/20 hover:bg-primary/10" asChild>
                  <div>
                    <Upload className="w-4 h-4" />
                  </div>
                </Button>
              </label>
              
              <Input
                placeholder="Ask me about styling, colors, trends, or anything fashion-related..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border-2 border-primary/20 focus:border-primary bg-input-background/50"
              />
              
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() && !uploadedImage}
                className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default Test;