import { KeyRound, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ChangePasswordModal from "@/components/SettingsPage/ChangePasswordModal";




function AccountSettings() {

const {signOut, profile, user, updateProfile} = useAuth();
const navigate = useNavigate();
const [username, setUsername] = useState(profile?.username ?? "");
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");
const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
async function handleLogout() {
    const {error} = await signOut();

    if(error) {
        console.error(error.message)
        return;
    }
    navigate("/login")
}

async function handleSaveUsername(e) {
    e.preventDevault();
    
    setSaving(true);
    setMessage("")

        const {error} = await updateProfile(username);
        
        setSaving(false);

        if(error) {
            setMessage(error.message);
            return;
        }
        setMessage("Username updated successfully")
    
}
    return(
       <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
  Account
</h2>

<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
  Manage your account information.
</p>
            </div>
            <div className="border-b border-gray-200 py-4 dark:border-gray-800">
       <form onSubmit={handleSaveUsername} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
                Username
            </span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
        </label>

        <button type="submit" disabled={saving} 
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? "Saving..." : "Save"}
        </button>
       </form>

       {message && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {message}
        </p>
       )}
       </div>
    <div className="border-b border-gray-200 py-4 dark:border-gray-800">
    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
    <span className="font-medium text-gray-900 dark:text-gray-100">{user?.email}</span>
</div>
<div className="border-b border-gray py-4"> 
    <p>Password</p>
    <span className="font-medium tracking-widest">••••••••••••</span>
    </div>

    <div className="border-b border-gray-200 py-4 dark:border-gray-800 flex justify-between"> 
     <button
  type="button"
  onClick={() => setIsPasswordModalOpen(true)}
  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
>
  <KeyRound size={18} />
  Change password
</button>
        <button onClick={handleLogout} type="button" className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"> 
            <LogOut size={18}/> Log out</button>
    </div>

    {isPasswordModalOpen && (
  <ChangePasswordModal
    onClose={() => setIsPasswordModalOpen(false)}
  />
)}
        </section>
    )
}
export default AccountSettings;