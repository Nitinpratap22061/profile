import { useState } from "react";
import { Send, Copy, Check, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const API_BASE = "https://personal-preview-1.onrender.com/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Response {
  status: number;
  statusText: string;
  data: any;
  time: number;
}

export function ApiClient() {
  const [endpoint, setEndpoint] = useState("");
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [headers, setHeaders] = useState(`{
  "Content-Type": "application/json"
}`);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!endpoint) {
      toast({
        title: "Error",
        description: "Please enter an endpoint",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const startTime = performance.now();

    try {
      const parsedHeaders = headers ? JSON.parse(headers) : {};
      const url = `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (["POST", "PUT", "PATCH"].includes(method) && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const data = await res.json().catch(() => res.text());
      const endTime = performance.now();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data,
        time: Math.round(endTime - startTime),
      });

      toast({
        title: "Request Successful",
        description: `${method} ${endpoint} completed in ${Math.round(endTime - startTime)}ms`,
      });
    } catch (error: any) {
      const endTime = performance.now();
      setResponse({
        status: 0,
        statusText: "Network Error",
        data: { error: error.message },
        time: Math.round(endTime - startTime),
      });

      toast({
        title: "Request Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "Response copied to clipboard",
      });
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-success";
    if (status >= 400 && status < 500) return "text-warning";
    if (status >= 500) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            API Client
          </h1>
          <p className="text-muted-foreground mt-2">
            Test and interact with your backend at {API_BASE}
          </p>
        </div>

        {/* Request Builder */}
        <div className="bg-gradient-card rounded-xl border border-border p-6 shadow-lg mb-6">
          <div className="space-y-4">
            {/* Method and Endpoint */}
            <div className="flex gap-3">
              <Select value={method} onValueChange={(v) => setMethod(v as HttpMethod)}>
                <SelectTrigger className="w-32 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  {API_BASE}/
                </span>
                <Input
                  placeholder="endpoint"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="pl-[140px] bg-background"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-gradient-primary hover:shadow-glow"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send
              </Button>
            </div>

            {/* Headers */}
            <div>
              <label className="text-sm font-medium mb-2 block">Headers</label>
              <Textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                className="font-mono text-xs bg-code-bg border-code-border min-h-[100px]"
                placeholder="Enter headers as JSON"
              />
            </div>

            {/* Body */}
            {["POST", "PUT", "PATCH"].includes(method) && (
              <div>
                <label className="text-sm font-medium mb-2 block">Body</label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="font-mono text-xs bg-code-bg border-code-border min-h-[150px]"
                  placeholder="Enter request body as JSON"
                />
              </div>
            )}
          </div>
        </div>

        {/* Response */}
        {response && (
          <div className="bg-gradient-card rounded-xl border border-border p-6 shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Response</h2>
                <span className={`font-mono text-sm ${getStatusColor(response.status)}`}>
                  {response.status} {response.statusText}
                </span>
                <span className="text-muted-foreground text-sm">
                  {response.time}ms
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={copyResponse}
                className="gap-2"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                Copy
              </Button>
            </div>
            <div className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-foreground">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}