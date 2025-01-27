// Zaktualizuj import typów
import { TabType } from '../../types/dashboard';
import ProfileTab from './Profile';
import CustomCalendarTab from './CustomCalendar';

// W komponencie Dashboard zaktualizuj tablicę tabs:
const tabs: { id: TabType; name: string; icon: string }[] = [
  { id: 'calendar', name: 'Kalendarz AI', icon: '🤖' },
  { id: 'custom-calendar', name: 'Własny kalendarz', icon: '📅' },
  { id: 'analytics', name: 'Analityka', icon: '📊' },
  { id: 'social', name: 'Social Media', icon: '🌐' },
  { id: 'profile', name: 'Profil', icon: '👤' }
];

// W sekcji renderowania zakładek dodaj:
{activeTab === 'profile' && <ProfileTab />}
{activeTab === 'custom-calendar' && <CustomCalendarTab />}

// W zakładce calendar dodaj edytor pod kalendarzem:
{activeTab === 'calendar' && (
  <div className="space-y-8">
    <CalendarTab
      selectedDate={selectedDate}
      posts={posts}
      isGenerating={isGenerating}
      onDateChange={handleDateChange}
      onGeneratePosts={generatePosts}
      getPostForDate={getPostForDate}
    />
    <EditorTab
      selectedDate={selectedDate}
      editedContent={editedContent}
      isEditing={isEditing}
      isPublishing={isPublishing}
      getPostForDate={getPostForDate}
      onEditContent={setEditedContent}
      onStartEditing={() => {
        setEditedContent(getPostForDate(selectedDate)?.content || '');
        setIsEditing(true);
      }}
      onCancelEditing={() => {
        setIsEditing(false);
        setEditedContent(getPostForDate(selectedDate)?.content || '');
      }}
      onSaveEdit={handleSaveEdit}
      onPublishPost={handlePublishPost}
    />
  </div>
)}