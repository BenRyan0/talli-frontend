"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Eye, EyeOff } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addPayment } from "../../src/store/reducers/paymentReducer"; // import it
import { Calendar28 } from "@/components/date-picker";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import { useDispatch } from "react-redux";
import { PaymentMethodDropbox } from "./paymentMethod";
import { useDispatch, useSelector } from "react-redux";

export function PaymentDrawer({
  open,
  onOpenChange,
  selectedRow,
  selectedDate,
  setSelectedDate,
}) {
  const dispatch = useDispatch();

  const [payment, setPayment] = useState("");

  const [error, setError] = useState("");

  const [value, setValue] = useState("");

  const { successMessage, errorMessage } = useSelector(
    (state) => state.payment
  );

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      console.log("NGIIII");

      dispatch(
        addPayment({
          amount: payment,
          paymentMethod: value,
          payerId: selectedRow._id,
          paidAt: selectedDate,
        })
      );
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (successMessage) {
      console.log("Asdasd");
    } else {
      console.log("Asdasd");
    }
  }, [successMessage, errorMessage]);
  function formatNumberWithCommas(value) {
    const cleaned = value.replace(/\D/g, "");
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function unformatNumber(value) {
    return value.replace(/,/g, "");
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[55vh] md:h-[60vh]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add Payment</DrawerTitle>
            <DrawerDescription>
              Add payment for <strong>{selectedRow?.name || "someone"}</strong>
            </DrawerDescription>
            <DrawerDescription>
              <Calendar28
                className="mt-2"
                onDateChange={setSelectedDate}
                value={selectedDate}
              />

              {/* <strong>{selectedDate  || "please select date"}</strong> */}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 mt-3">
            <form onSubmit={handleAddPayment}>
              <div className="flex flex-col  gap-6 text-slate-100">
                <div className="flex gap-2">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="payment"
                      type="text"
                      value={formatNumberWithCommas(payment)}
                      onChange={(e) => {
                        const rawValue = unformatNumber(e.target.value);
                        setPayment(rawValue);
                      }}
                      required
                      placeholder="value"
                      className="appearance-none"
                      style={{
                        MozAppearance: "textfield",
                        WebkitAppearance: "none",
                      }}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <PaymentMethodDropbox value={value} setValue={setValue} />
                  </div>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}
                <div className="flex flex-col gap-3">
                  {/* <Button
                    type="submit"
                    className="w-full bg-slate-100 text-gray-700 font-bold hover:bg-cyan-500 hover:text-white transition-all duration-300"
                  >
                    Login
                  </Button> */}
                  <Button
                    onClick={() =>
                      console.log("Submit payment for:", selectedRow)
                    }
                  >
                    Add Payment
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <DrawerFooter className="">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
