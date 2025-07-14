'use client';

import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApoiadorProps } from "@/types";

export interface CardApoiadorProps {
    apoiador: ApoiadorProps;
}

const CardApoiador = ({ apoiador }: CardApoiadorProps) => {
    const { nome, avatar } = apoiador;

    return (
        <UICard className="border border-green-200 rounded-lg shadow-md w-[200px] h-auto bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2 text-center">
                <div className="flex flex-col items-center space-y-3">
                    <img
                        src={avatar}
                        alt={nome}
                        className="w-16 h-16 rounded-full object-cover border-3 border-green-200 shadow-sm"
                    />
                    <CardTitle className="text-lg font-bold text-slate-800 text-center">
                        {nome}
                    </CardTitle>
                </div>
            </CardHeader>
        </UICard>
    );
};

export default CardApoiador;
