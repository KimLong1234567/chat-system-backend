-- Bảng người dùng (user)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    chat_enabled tinyint DEFAULT 0,
    UNIQUE (user_email)
);

-- Bảng cuộc trò chuyện (chat)
CREATE TABLE chats (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat_name VARCHAR(255) NOT NULL,
    pin_code INT(4),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Bảng thành viên trong cuộc trò chuyện (chat_members)
CREATE TABLE chat_members (
    user_id INT,
    chat_id INT,
    role_type INT DEFAULT 4, -- Type 1: chủ, Type 2: admin, Type 3: người dùng thường, Type 4: chờ xét duyệt
    pin_code INT(4),
    PRIMARY KEY (user_id, chat_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);

-- Bảng ghi chú (notes)
CREATE TABLE notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat_id INT,
    content TEXT NOT NULL,
    pinned tinyint DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);

-- Bảng bình chọn (votes)
CREATE TABLE votes (
    vote_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat_id INT,
    options VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);

CREATE TABLE chats_content(
	chat_id int,
    user_id int, 
    chat_content VARCHAR(255),
    chat_send_datetime datetime,
    chat_send_update datetime,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
);

ALTER TABLE users ADD user_create datetime
ALTER TABLE users ADD user_update datetime

ALTER TABLE chats ADD chat_create datetime
ALTER TABLE chats ADD chat_update datetime

ALTER TABLE chat_members ADD chat_members_create datetime
ALTER TABLE chat_members ADD chat_members_update datetime
ALTER TABLE chat_members ADD chat_members_notification tinyint DEFAULT 0

ALTER TABLE notes ADD notes_create datetime
ALTER TABLE notes ADD notes_update datetime

ALTER TABLE votes ADD vote_create datetime
ALTER TABLE votes ADD vote_update datetime

ALTER TABLE chats ADD chat_status int(3) DEFAULT 0 --kiem tra kenh chat con` hoat. dong. ko
ALTER TABLE chat_members ADD chat_members_status int(3) DEFAULT 0
ALTER TABLE chats_content ADD chat_pin int(3) DEFAULT 0
ALTER TABLE chats_content ADD chat_content_status int(3) DEFAULT 0


-- ALTER TABLE users ADD FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
-- drop database chat_system,