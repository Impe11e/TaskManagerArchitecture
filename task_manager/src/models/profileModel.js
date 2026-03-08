const profileFactory = (id, data) => {
  return {
    id: id,
    userId: parseInt(data.userId),
    bio: data.bio || "",
    avatar: data.avatar || null,
    bday: data.bday || null,
    phone: data.phone || "",
  };
};

export default profileFactory;
