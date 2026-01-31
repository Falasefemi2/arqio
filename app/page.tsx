import { LoginForm } from "@/components/auth/login-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 md:p-0">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl bg-white">
          {/* Form Section */}
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
            <LoginForm />
          </div>

          {/* Branding Section */}
          <div className="hidden md:flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-between items-center relative overflow-hidden">
            {/* Code background effect */}
            <div className="absolute inset-0 opacity-20 font-mono text-xs text-slate-500 overflow-hidden">
              <div className="whitespace-pre">
                {`export function ArgumentsParser() {
  const [tempArguments] = useCallback(
    (data: IntegrationDataInitialization): AutoArgumentsAI => {
      return {
        edits: [[]],
        interfaces: {
          Integration: SubintegrationIntegration('A'),
        },
      };
    },
    [edits],
  );
}`}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">raid</span>
                  </div>
                </div>
                <div>
                  <p className="text-orange-400 text-lg font-semibold tracking-wide">
                    AI-Driven Innovation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
