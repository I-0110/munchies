import React from 'react';
import { Link } from 'react-router-dom';

type MealCardProps = {  
    _id: string
    name: string
    author?: string
    category?: string
    instructions:string
    image_url?: string
    video_url?: string
    ingredients: []
}

const MealCard: React.FC<MealCardProps> = ({ image_url, name, category }) => (
    <Link to={`/recipe/${name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #eee',
            borderRadius: 8,
            padding: 12,
            background: '#fff',
            cursor: 'pointer'
        }}>
            <img
                src={image_url}
                alt={name}
                style={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 8,
                    marginRight: 16
                }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>{name}</span>
                {category && (
                    <span style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
                        {category}
                    </span>
                )}
            </div>
        </div>
    </Link>
);

export default MealCard;