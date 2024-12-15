import NavigationMain from './components/NavigationMain'
import DocumentPaper from './components/DocumentPaper'
import LogoutButton from './components/LogoutButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFCF9] flex flex-col">
      <header className="h-[72px] md:h-[92px] mb-4">
        <div className="relative w-full p-4 md:p-6 lg:p-8 flex justify-end">
          <LogoutButton />
        </div>
      </header>
      
      <div className="flex flex-1">
        <NavigationMain />
        <main className="flex-1 px-4 md:px-8 lg:px-16">
          <DocumentPaper />
        </main>
      </div>

      <footer className="w-full h-[60px] md:h-[80px] mt-16 border-t border-gray-200" />
    </div>
  )
}

