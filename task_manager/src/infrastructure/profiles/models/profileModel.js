const profileFactory = (id, data) => {
  return {
    id: id,
    userId: data.userId,
    phone: data.phone,
    bio: data.bio,
  };
};

export default profileFactory;
