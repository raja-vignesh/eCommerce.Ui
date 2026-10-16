import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";

type UserContextType = {
  user: string | null;
  setUser: React.Dispatch<SetStateAction<string | null>>;
  clearStorage: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => localStorage.getItem("user"));

  const clearStorage = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearStorage }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("context must be used within the provider");
  return context;
};

export { useUserContext, UserProvider };
